Utilities for working with Chrome Web Store endpoints
---

Build the bundle  
`npm run build`  
Execute the bundle in nodejs; in the console you will see the result  
`npm run start`  
Build and run  
`npm run build-and-run`
---

##### fetch_data_from_cws fn
```ts
/**
* Fetches extn details from CWS endpoint.
* @param extnList - extns, for which details need to be fetched from CWS.
*
* @exampleInput [
*  {id:"aapbdbdomjkkjkaonfhkkikfgjllcleb", version: "0.0.10"},
*  {id:"bcjnomeiefemlmcpcmkkknlelcicaflf", version: "1.2"},
*  {id:"incorrectId", version: "2.1.1"},] .
* @exampleOutput [
*   {
*     id: 'aapbdbdomjkkjkaonfhkkikfgjllcleb',
*     status: 'update',
*     latestVersion: '2.0.10',
*     url: 'https://clients2.googleusercontent.com/crx/blobs/Acy1k0byAGABCI_jFiegO7thb8wyw4cZg4h2p0kU6P981c0_w5fULcnaecFlGzQ39qxmTA3BhBAxMVVeMiICjC8ofXIY_SW4KAJldCKpwi6tuSNgVH2kAMZSmuVpWL96p6pW0F8kdpfkaZcb2vUqGA/extension_2_0_10_0.crx'
*   },
*   { id: 'bcjnomeiefemlmcpcmkkknlelcicaflf', updateStatus: 'noupdate' },
*   { id: 'incorrectId', status: 'error-invalidAppId' }] .
*/
```

You can test fetching data for different extns by modifying `fetch_data_from_cws` fn argument in `src/entry/index.ts` and then running `npm run build-and-run`.

---
You can toggle Proxy and Remote logging in `project.config.ts`.
