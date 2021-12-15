// Explain: Responses are lengthy.
/* eslint-disable max-lines */

export type UnparsedCWS_Response = ")]}' response body here";
export type CWS_Response = {response: {app: (NoUpdateResponse | UpdateExistsResponse)[]}};

type NoUpdateResponse = {
  appid: string;
  status: string | "ok";
  updatecheck: {
    _esbAllowlist: "false";
    status: "noupdate";
  };
};

type UpdateExistsResponse = {
  appid: string;
  status: string | "ok";
  updatecheck: {
    _esbAllowlist: "false";
    // Explain: if "ok" - there is an update.
    status: "ok";
    urls: {
      url: [
        {
          // Explain: download url.
          codebase: string;
        },
      ];
    };
    manifest: {
      // Explain: Extn latest available version, eg "1.0.3".
      version: string;
      packages: {
        package: [
          {
            hash_sha256: string;
            size: number;
            // Explain: filename, eg "extension_1_1_0_0.crx".
            name: string;
            fp: "string";
            required: true;
          },
        ];
      };
    };
  };
};
