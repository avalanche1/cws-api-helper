// Explain: Short ids in cws object shape.
/* eslint-disable id-length */

import {GenericObject} from "../../../../utility-belt/types/generic-types";
import {ExtnList} from "../fetch-data-from-CWS";

/**
 * Constructs the body for get-updates-request from a given extn list.
 * @param extnList - List of extns to update.
 *
 * @exampleInput [
 *	{id:"aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
 *	{id:"bcjnomeiefemlmcpcmkkknlelcicaflf", version: "1.2"},
 *	{id:"incorrectId", version: "2.1.1"},] .
 * @exampleOutput
 * 	Request body data object.
 *
 * @sideEffects No.
 * @hasTests No.
 */

export function construct_req_body_from(extnList: ExtnList): GenericObject {
  return {
    request: {
      "@os": "mac",
      "@updater": "chromecrx",
      acceptformat: "crx2,crx3",
      app: extnList.map((extn) => {
        return {
          appid: extn.id,
          updatecheck: {},
          version: extn.version,
        };
      }),
      prodversion: "95.0.4638.69",
      protocol: "3.1",
    },
  };
}
