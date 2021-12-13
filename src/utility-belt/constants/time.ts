// Explain= Multiplication in many places.
/* eslint-disable no-magic-numbers */

const MS_IN_ONE_SECOND = 1000;
const ONE_SECOND = MS_IN_ONE_SECOND;
const QUARTER_SECOND = ONE_SECOND / 4;
const HALF_A_SECOND = ONE_SECOND / 2;
const TWO_SECONDS = ONE_SECOND * 2;
const THREE_SECONDS = ONE_SECOND * 3;
const FIVE_SECONDS = ONE_SECOND * 5;
const TEN_SECONDS = ONE_SECOND * 10;
const FIFTEEN_SECONDS = ONE_SECOND * 15;
const HALF_A_MINUTE = ONE_SECOND * 30;

const SECONDS_IN_ONE_MINUTE = 60;
const MINUTES_IN_ONE_HOUR = SECONDS_IN_ONE_MINUTE;
const ONE_MINUTE = ONE_SECOND * SECONDS_IN_ONE_MINUTE;
const HALF_AN_HOUR = ONE_MINUTE * 30;
const ONE_HOUR = ONE_MINUTE * MINUTES_IN_ONE_HOUR;

const HOURS_IN_ONE_DAY = 24;
const ONE_DAY = HOURS_IN_ONE_DAY * ONE_HOUR;
const ONE_MONTH_30 = ONE_DAY * 30;

// Explain: The maximum value, that can be assigned to setTimeout; circa 596 hours.
const TIMEOUT_MAX = 2147483647;

export const TIME = {
  ONE_SECOND,
  QUARTER_SECOND,
  HALF_A_SECOND,
  TWO_SECONDS,
  THREE_SECONDS,
  FIVE_SECONDS,
  TEN_SECONDS,
  FIFTEEN_SECONDS,
  HALF_A_MINUTE,
  ONE_MINUTE,
  HALF_AN_HOUR,
  ONE_HOUR,
  ONE_DAY,
  ONE_MONTH_30,
  TIMEOUT_MAX,
} as const;
