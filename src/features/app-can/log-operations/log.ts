/**
 * Logs either to console, or to remote service, if enabled in CONFIG.
 * @param text - Text to log; description of data object.
 * @param data - Data object to log.
 *
 * @exampleInput
 *  'Received list of extns to check: ', [{id:"aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"}, ...] .
 *
 * @sideEffects Console; remote API.
 * @hasTests No.
 */

export function log(text: string, data?: unknown): void {
  const finalText =
    dayjs().format("YY-MM-DD HH:mm:ss SSS") +
    " " +
    text +
    (data !== undefined ? ` ${JSON.stringify(data)}` : "");

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  PRJ_CONFIG.LOGGING.ENABLE_REMOTE
    ? void REST.post({
        url: PRJ_CONFIG.LOGGING.URL,
        payload: finalText,
        dataDescription: "logger",
      })
    : console.log(finalText);
}

import {REST} from "../../../utility-belt/helpers/http/REST";
import {PRJ_CONFIG} from "../../../../project.config";
import dayjs from "dayjs";
