import {construct_req_body_from} from "./api/construct-req-body";
import {REST} from "../../../utility-belt/helpers/http/REST";

import {PRJ_CONFIG} from "../../../../project.config";

import {CWS_Response, UnparsedCWS_Response} from "./types";

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
  try {
    const response = await REST.post<UnparsedCWS_Response>({
      url:
        //  todo: test with proxy env.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/strict-boolean-expressions
        (PRJ_CONFIG.USE_PROXY ? (process.env as {PROXY_URL: string}).PROXY_URL : "") +
        "https://update.googleapis.com/service/update2/json",
      dataDescription: "CWS updates list",
      payload: construct_req_body_from(extnList),
    });

    if (REST.is_ok(response)) {
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
      return result;
    } else return {error: new Error(`Request error: ${response}`)};
  } catch (err) {
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
