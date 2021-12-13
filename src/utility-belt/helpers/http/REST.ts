import {make_request} from "./make-request";

import {ERRORS} from "../../constants/errors";

import {HTTPError} from "../../types/errors";
import {Request_T} from "./types";

export const REST = {get, post, /*delete*/ is_ok};
export type {HTTPError};

async function get<T>(argsObj: Request_T): Promise<HTTPError | T> {
  return make_request<T>({...argsObj, ...{type: "GET"}});
}

async function post<T>(args: Request_T): Promise<HTTPError | T> {
  return make_request<T>({...args, ...{type: "POST"}});
}

function is_ok<T>(response: HTTPError | T): response is T {
  return !Object.values(ERRORS).includes(response as HTTPError);
}
