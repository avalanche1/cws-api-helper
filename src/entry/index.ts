import {fetch_data_from_cws} from "../features/app-can/fetch-data-from-CWS/fetch-data-from-CWS";

(async () => {
  const result = await fetch_data_from_cws([
    {
      id: "aapbdbdomjkkjkaonfhkkikfgjllcleb",
      version: "0.0.10",
    },
    {id: "bcjnomeiefemlmcpcmkkknlelcicaflf", version: "1.2"},
    {id: "incorrectId", version: "2.1.1"},
  ]);
  console.log(result);
})();
