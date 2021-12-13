import {REST, HTTPError} from "../../../utility-belt/helpers/http/REST";

import {async_forEach_in_sequence} from "../../../utility-belt/helpers/async/for-each";
import {construct_req_body_from} from "./api/construct-req-body";
import {CWS_Response} from "./types";
import {URLS} from "./urls";

/**
 * Fetches extn details from CWS endpoint.
 * @param extnList - extns, for which details need to be fetched from CWS.
 *
 * @exampleInput
 *   .
 * @exampleOutput
 *  '49597526300' .
 *
 * @sideEffects Network IO.
 */
export async function fetch_data_from_cws(
  extnList: ExtnList,
): Promise<Result[] | {error: Error}> {
  try {
    const unprocessedResults: CWS_Response[] = [];

      const response = await REST.post<CWS_Response[]>({
        url: process.env["PROXY_URL"] + 'https://update.googleapis.com/service/update2/json',
        dataDescription: "get IG user id",
        payload: construct_req_body_from(extnList),
      });
      return REST.is_ok(response) ? unprocessedResults.push(response) : response;
    });

    return results;
  } catch (err) {
    return {error: new Error(`Unknown error: ${JSON.stringify(err)}`)};
  }
}

export type ExtnList = ExtnDescriptor[];
type ExtnDescriptor = {id: string; version: string};

type Result = NoUpdateResult | UpdateExistsResult;
type NoUpdateResult = ExtnDescriptor & {status: "noupdate"};
type UpdateExistsResult = ExtnDescriptor & {
  status: "update";
  downloadUrl: string;
  version: string;
};
