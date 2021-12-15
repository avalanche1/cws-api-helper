/* eslint-disable no-console */
import {env_is} from "../env/env";

import {ObjectValuesUnionOf} from "../../types/generic-types";

// Make devprint global for ease of debugging - no need to import explicitly.
// eslint-disable-next-line functional/immutable-data
(globalThis as typeof globalThis & {devprint: typeof devprint}).devprint = devprint;

/**
 * @description: Prints to console in dev environment; accepts optional indents
 * @exampleInput: 'foo', 2
 * @exampleOutput: console.log('  foo')
 * @pure: false: depends on env_is, prints to console
 * @hasTests: false
 */
const enum PrinterTypes {
  LOG = "LOG",
  WARN = "WARN",
  ERROR = "ERROR",
}
type PrintType = ObjectValuesUnionOf<typeof PrinterTypes>;

export function devprint(
  textToPrint: string,
  relatedValue?: unknown,
  indentsNum?: number,
  type?: PrintType,
): void {
  if (!env_is.dev()) return;

  const printer = {
    [PrinterTypes.LOG]: console.log,
    [PrinterTypes.WARN]: console.warn,
    [PrinterTypes.ERROR]: console.error,
  };

  if (!type) {
    // eslint-disable-next-line no-param-reassign
    type = PrinterTypes.LOG;
  }

  const tabs = Number.isFinite(indentsNum) ? " ".repeat(indentsNum as number) : "";
  // const tabs = indentsNum ? "\t".repeat(indentsNum) : ""; // Tabs
  printer[type](
    tabs + textToPrint,
    relatedValue instanceof Error ? JSON.stringify(relatedValue) : relatedValue ?? "",
  );
}

/* eslint-disable functional/immutable-data */
devprint.warn = function warn(
  text: string,
  relatedValue?: unknown,
  indentsNum = 0,
): void {
  return devprint(text, relatedValue, indentsNum, PrinterTypes.WARN);
};
devprint.error = function error(
  text: string,
  relatedValue?: unknown,
  indentsNum = 0,
): void {
  return devprint(text, relatedValue, indentsNum, PrinterTypes.ERROR);
};
