describe("log fn", () => {
  it("prints to console", () => {
    expect.assertions(2);

    console.log = jest.fn();

    log("Received list of extns to check:");
    log("Received list of extns to check:", [
      {id: "aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
    ]);

    expect(console.log.mock.calls[0][0]).toBe("Received list of extns to check:");
    expect(console.log.mock.calls[1][0]).toBe(
      `Received list of extns to check: [{"id":"aapbdbdomjkkjkaonfhkkikfgjllcleb","version":"0.0.10"}]`,
    );
  });

  // Explain: To test this - set PRJ_CONFIG.LOGGING.URL = true.
  /*it("sends log to remote endpoint", () => {
    expect.assertions(1);

    mock_axios_response({data: {status: "200"}});

    log("Received list of extns to check:", [
      {id: "aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
    ]);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
  });

  function mock_axios_response({data, error}: Mock_axios_responseParams): void {
    mockAxios.reset();
    if (!error) mockAxios.post.mockResolvedValueOnce({data});
    else mockAxios.post.mockRejectedValue(error);
  }*/
});

type Mock_axios_responseParams = {
  data?: Record<string, unknown>;
  error?: {isAxiosError: true; code: HTTP_RC; response: string};
};

import mockAxios from "jest-mock-axios";
import {log} from "./log";
import {HTTP_RC} from "../../../utility-belt/helpers/http/dict";
