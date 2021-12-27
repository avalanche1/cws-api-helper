/**
 * Fetches extn details from CWS endpoint.
 * @param extnList - extns, for which details need to be fetched from CWS.
 *
 * @exampleInput [
 *  {id:"aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
 *  {id:"bcjnomeiefemlmcpcmkkknlelcicaflf", version: "1.2"},
 *  {id:"incorrectId", version: "2.1.1"},] .
 * @exampleOutput [
 *   {
 *     id: 'aapbdbdomjkkjkaonfhkkikfgjllcleb',
 *     status: 'update',
 *     latestVersion: '2.0.10',
 *     url: 'https://clients2.googleusercontent.com/crx/blobs/Acy1k0byAGABCI_jFiegO7thb8wyw4cZg4h2p0kU6P981c0_w5fULcnaecFlGzQ39qxmTA3BhBAxMVVeMiICjC8ofXIY_SW4KAJldCKpwi6tuSNgVH2kAMZSmuVpWL96p6pW0F8kdpfkaZcb2vUqGA/extension_2_0_10_0.crx'
 *   },
 *   { id: 'bcjnomeiefemlmcpcmkkknlelcicaflf', updateStatus: 'noupdate' },
 *   { id: 'incorrectId', status: 'error-invalidAppId' }] .
 *
 * @sideEffects Network IO.
 */
export async function fetch_data_from_cws(
  extnList: ExtnList,
): Promise<Result[] | {error: Error}> {
  log("Received extns to update:", extnList);

  try {
    const response = await REST.post<UnparsedCWS_Response>({
      url:
        (PRJ_CONFIG.PROXY.ENABLED ? PRJ_CONFIG.PROXY.URL : "") +
        "https://update.googleapis.com/service/update2/json",
      dataDescription: "CWS updates list",
      payload: construct_req_body_from(extnList),
    });
    log("Received response from CWS:", response);

    if (REST.is_ok(response)) {
      // Explain: CWS returns )]}' string as response head; trim it to parse the data.
      // eslint-disable-next-line no-magic-numbers
      const parsedResponse = (JSON.parse(response.substring(4, Infinity)) as CWS_Response)
        .response;
      const result: Result[] = parsedResponse.app.map(
        ({appid, updatecheck, status}, idx) => {
          // Explain: This is status of extn check request - whether it is correct or not.
          // Explain: idx corresponds to extnList length absolutely.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          if (status === "error-invalidAppId") return {id: extnList[idx]!.id, status};

          // Explain: This is the status of the update.
          const updateStatus = updatecheck.status;
          return updateStatus === "noupdate"
            ? {id: appid, updateStatus}
            : {
                id: appid,
                status: "update",
                latestVersion: updatecheck.manifest.version,
                url:
                  updatecheck.urls.url[0].codebase +
                  updatecheck.manifest.packages.package[0].name,
              };
        },
      );

      log("Extns processing result:", result);
      return result;
    } else {
      log("Received error from CWS server", response);
      return {error: new Error(`Response error: ${response}`)};
    }
  } catch (err) {
    log("Error occurred, while fetching data", err);
    return {error: new Error(`Unknown error: ${err as string}`)};
  }
}

export type ExtnList = ExtnDescriptor[];
type ExtnDescriptor = {id: string; version: string};

type Result = IncorrectExtnIdResult | NoUpdateResult | UpdateExistsResult;

type IncorrectExtnIdResult = {id: string} & {status: "error-invalidAppId"};

type NoUpdateResult = {id: string} & {status: "noupdate"};
type UpdateExistsResult = {
  status: "update";
  url: string;
  latestVersion: string;
} & {id: string};

import {construct_req_body_from} from "./api/construct-req-body";
import {REST} from "../../../utility-belt/helpers/http/REST";
import {log} from "../log-operations/log";

import {PRJ_CONFIG} from "../../../../project.config";

import {CWS_Response, UnparsedCWS_Response} from "./types";
