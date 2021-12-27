/* eslint-disable functional/no-try-statement */

import {devprint} from "../debug/devprint";

import axios, {AxiosError, AxiosResponse} from "axios";
import {for_ms} from "../async/wait";

import {ERRORS} from "../../constants/errors";
import {TIME} from "../../constants/time";

import {HTTPError} from "../../types/errors";
import {Request_T} from "./types";
import {HTTP_RC, REQUEST_TYPE} from "./dict";

// Explain: Will update later; need as state.
// eslint-disable-next-line functional/no-let
let retryCount = 0;
const MAX_RETRIES = 3;

export async function make_request<T>(
  args: Request_T,
): Promise<ERRORS.GENERIC | HTTPError | T> {
  const {type, url, payload, axiosConfig, log = true, dataDescription} = args;
  const {returnFullResponse} = args;

  try {
    // Explain: Need conditional assignment.
    // eslint-disable-next-line functional/no-let,@typescript-eslint/init-declarations
    let axiosResponse: AxiosResponse<T>;
    if (type === REQUEST_TYPE.GET) axiosResponse = await axios.get(url, axiosConfig);
    else axiosResponse = await axios.post(url, payload, axiosConfig);

    if (log)
      devprint(
        `${dataDescription} result:`,
        returnFullResponse ? axiosResponse : axiosResponse.data,
      );
    if (!Boolean(axiosResponse.data)) return ERRORS.REMOTE_DATA_NOT_FOUND;

    return returnFullResponse
      ? (axiosResponse as AxiosResponse<T>)
      : (axiosResponse.data as T);
  } catch (err) {
    if (args.errorLoggingFn) void args.errorLoggingFn(err, "make-request");

    devprint.error(
      "Error: ",
      is_AxiosError(err) && err.response
        ? `${err.response.status}: ${err.response.statusText}: ${err.response.data}`
        : JSON.stringify(err),
    );

    if (is_AxiosError(err)) {
      const errorCode = err.response?.status ?? 0;
      if (errorCode === HTTP_RC.NOT_FOUND) return ERRORS.REMOTE_DATA_NOT_FOUND;
      // Explain: Too many requests || 5xx codes - server-side errors; retry n times.
      else if (
        errorCode === HTTP_RC.TOO_MANY_REQUESTS ||
        errorCode >= HTTP_RC.SERVER_ERROR
      ) {
        if (retryCount >= MAX_RETRIES) {
          retryCount = 0;
          return errorCode === HTTP_RC.TOO_MANY_REQUESTS
            ? ERRORS.TOO_MANY_REQUESTS
            : ERRORS.SERVER;
        }
        await for_ms(TIME.FIVE_SECONDS * (retryCount + 1));
        retryCount++;

        return make_request(args);
        // Explain: 4xx codes - incorrectly formed request data (header | body).
      } else if (errorCode >= HTTP_RC.BAD_REQUEST && errorCode < HTTP_RC.SERVER_ERROR)
        return ERRORS.INCORRECT_REQUEST_DATA;

      return ERRORS.NETWORK;
    } else return ERRORS.GENERIC;
  }
}

function is_AxiosError(err: AxiosError | Error | unknown): err is AxiosError {
  return (err as AxiosError).isAxiosError;
}
