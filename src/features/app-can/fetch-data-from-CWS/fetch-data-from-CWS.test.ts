/* eslint-disable jest/prefer-lowercase-title */
// Explain: https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/#Way-2-jest-mock-axios.

// jest.mock("axios");

describe("fetch_data_from_cws fn", () => {
  it("Fetches extn details from CWS endpoint", async () => {
    expect.assertions(2);

    mock_axios_response({data: ")]}'" + JSON.stringify(correctResponse)});
    const result = await fetch_data_from_cws([
      {id: "aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
      {id: "bcjnomeiefemlmcpcmkkknlelcicaflf", version: "1.2"},
      {id: "incorrectId", version: "2.1.1"},
    ]);

    expect(result).toStrictEqual([
      {
        id: "aapbdbdomjkkjkaonfhkkikfgjllcleb",
        latestVersion: "2.0.10",
        status: "update",
        url: "https://clients2.googleusercontent.com/crx/blobs/Acy1k0byAGABCI_jFiegO7thb8wyw4cZg4h2p0kU6P981c0_w5fULcnaecFlGzQ39qxmTA3BhBAxMVVeMiICjC8ofXIY_SW4KAJldCKpwi6tuSNgVH2kAMZSmuVpWL96p6pW0F8kdpfkaZcb2vUqGA/extension_2_0_10_0.crx",
      },
      {
        id: "bcjnomeiefemlmcpcmkkknlelcicaflf",
        latestVersion: "1.2",
        status: "update",
        url: "https://clients2.googleusercontent.com/crx/blobs/Acy1k0YGX8VbJggL8R0-BqArEGB0gbcsPBBGMwLmHt8hvW7LXJKSKXmiuch6hcsIty3ldEpjCnTNCNtY8FNfkiRohM5-PhVkxtjFG8N1t_aEZe4EjEgGCwDGUprlGHhxO4HIyVWVF540Rwt_SJL-NCI/extension_1_2_0_0.crx",
      },
      {id: "incorrectId", status: "error-invalidAppId"},
    ]);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });

  function mock_axios_response({data, error}: Mock_axios_responseParams): void {
    mockAxios.reset();
    if (!error) mockAxios.post.mockResolvedValueOnce({data});
    else mockAxios.post.mockRejectedValueOnce(error);
  }
});

type Mock_axios_responseParams = {
  data?: Record<string, unknown>;
  error?: {isAxiosError: true; code: HTTP_RC};
};

const correctResponse = {
  response: {
    server: "prod",
    protocol: "3.1",
    daystart: {elapsed_seconds: 18063, elapsed_days: 5461},
    app: [
      {
        appid: "aapbdbdomjkkjkaonfhkkikfgjllcleb",
        cohort: "1::",
        status: "ok",
        cohortname: "",
        ping: {status: "ok"},
        updatecheck: {
          _esbAllowlist: "true",
          status: "ok",
          urls: {
            url: [
              {
                codebase:
                  "https://clients2.googleusercontent.com/crx/blobs/Acy1k0byAGABCI_jFiegO7thb8wyw4cZg4h2p0kU6P981c0_w5fULcnaecFlGzQ39qxmTA3BhBAxMVVeMiICjC8ofXIY_SW4KAJldCKpwi6tuSNgVH2kAMZSmuVpWL96p6pW0F8kdpfkaZcb2vUqGA/",
              },
            ],
          },
          manifest: {
            version: "2.0.10",
            packages: {
              package: [
                {
                  hash_sha256:
                    "99567527ea87874d2183d7084f83c534708b31e66119dccc07aa3d36c16eeb72",
                  size: 230387,
                  name: "extension_2_0_10_0.crx",
                  fp: "1.99567527ea87874d2183d7084f83c534708b31e66119dccc07aa3d36c16eeb72",
                  required: true,
                },
              ],
            },
          },
        },
      },
      {
        appid: "bcjnomeiefemlmcpcmkkknlelcicaflf",
        cohort: "1::",
        status: "ok",
        cohortname: "",
        ping: {status: "ok"},
        updatecheck: {
          _esbAllowlist: "false",
          status: "ok",
          urls: {
            url: [
              {
                codebase:
                  "https://clients2.googleusercontent.com/crx/blobs/Acy1k0YGX8VbJggL8R0-BqArEGB0gbcsPBBGMwLmHt8hvW7LXJKSKXmiuch6hcsIty3ldEpjCnTNCNtY8FNfkiRohM5-PhVkxtjFG8N1t_aEZe4EjEgGCwDGUprlGHhxO4HIyVWVF540Rwt_SJL-NCI/",
              },
            ],
          },
          manifest: {
            version: "1.2",
            packages: {
              package: [
                {
                  hash_sha256:
                    "eb1085af414c7961b3f9317bd8b6b2a88c664266fdf12f79d4141265f7e05b8b",
                  size: 8346361,
                  name: "extension_1_2_0_0.crx",
                  fp: "1.eb1085af414c7961b3f9317bd8b6b2a88c664266fdf12f79d4141265f7e05b8b",
                  required: true,
                },
              ],
            },
          },
        },
      },
      {appid: "", status: "error-invalidAppId"},
    ],
  },
};

import mockAxios from "jest-mock-axios";
import {fetch_data_from_cws} from "./fetch-data-from-CWS";
import {HTTP_RC} from "../../../utility-belt/helpers/http/dict";
