/* eslint-disable jest/prefer-lowercase-title */

import {construct_req_body_from} from "./construct-req-body";

describe("construct_req_body_from fn", () => {
  it("Constructs the body for get-updates-request from a given extn list", async () => {
    expect.assertions(1);

    const result = construct_req_body_from([
      {id: "aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
      {id: "bcjnomeiefemlmcpcmkkknlelcicaflf", version: "1.2"},
      {id: "incorrectId", version: "2.1.1"},
    ]);

    expect(result).toStrictEqual({
      request: {
        "@os": "mac",
        "@updater": "chromecrx",
        acceptformat: "crx2,crx3",
        app: [
          {
            appid: "aapbdbdomjkkjkaonfhkkikfgjllcleb",
            updatecheck: {},
            version: "0.0.10",
          },
          {
            appid: "bcjnomeiefemlmcpcmkkknlelcicaflf",
            updatecheck: {},
            version: "1.2",
          },
          {
            appid: "incorrectId",
            updatecheck: {},
            version: "2.1.1",
          },
        ],
        prodversion: "95.0.4638.69",
        protocol: "3.1",
      },
    });
  });
});
