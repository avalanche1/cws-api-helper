// Explain: Magic numbers as error codes.
/* eslint-disable functional/no-try-statement,no-magic-numbers */

import {REQUEST_TYPE} from "./dict";

import {AxiosRequestConfig} from "axios";

export type Request_T = {
  url: string;
  type?: REQUEST_TYPE;
  payload?: unknown;
  axiosConfig?: AxiosRequestConfig;
  log?: boolean;
  dataDescription: string;
  returnFullResponse?: true;
  errorLoggingFn?: (err: unknown, moduleName: string) => Promise<void>;
};
