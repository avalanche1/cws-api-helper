/* eslint-disable jest/prefer-lowercase-title */
// Explain: https://vhudyma-blog.eu/3-ways-to-mock-axios-in-jest/#Way-2-jest-mock-axios.
import mockAxios from "jest-mock-axios";

import {fetch_data_from_cws} from "./fetch-data-from-CWS";

import {HTTP_RC} from "../../../utility-belt/helpers/http/dict";

jest.mock("axios");

type Mock_axios_responseParams = {
  data?: Record<string, unknown>;
  error?: {isAxiosError: true; code: HTTP_RC};
};

describe("fetch_data_from_cws fn", () => {
  it("Fetches extn details from CWS endpoint", async () => {
    expect.assertions(2);

    mock_axios_response({data: {graphql: {user: {id: "49597526300"}}}});
    const result = await fetch_data_from_cws("kak_kianu");

    expect(result).toBe("49597526300");
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

  // it("Returns 400 response for incorrect data", async () => {
  //   expect.assertions(2);
  //
  //   mock_axios_response({data: {graphql: {user: {id: "49597526300"}}}});
  //   const result = await fetch_data_from_cws("kak_kianu");
  //
  //   expect(result).toBe("49597526300");
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // });
  //
  // it("Calls reverse proxy endpoint", async () => {
  //   expect.assertions(2);
  //
  //   mock_axios_response({data: {graphql: {user: {id: "49597526300"}}}});
  //   const result = await fetch_data_from_cws("kak_kianu");
  //
  //   expect(result).toBe("49597526300");
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // });
  //
  // it("Logs operations", async () => {
  //   expect.assertions(2);
  //
  //   mock_axios_response({data: {graphql: {user: {id: "49597526300"}}}});
  //   const result = await fetch_data_from_cws("kak_kianu");
  //
  //   expect(result).toBe("49597526300");
  //   expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // });

  // describe("In case of an error", () => {
  //   it("Returns the error code", async () => {
  //     expect.assertions(2);
  //
  //     mock_axios_response({error: {isAxiosError: true, code: HTTP_RC.TOO_MANY_REQUESTS}});
  //     const result = await fetch_data_from_cws("kak_kianu");
  //
  //     expect(result).toBe(ERRORS.NETWORK);
  //     expect(mockAxios.get).toHaveBeenCalledTimes(1);
  //   });
  // });

  function mock_axios_response({data, error}: Mock_axios_responseParams): void {
    mockAxios.reset();
    if (!error) mockAxios.get.mockResolvedValueOnce({data});
    else mockAxios.get.mockRejectedValueOnce(error);
  }
});
