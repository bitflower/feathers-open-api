import feathers, { Application } from '@feathersjs/feathers';

import { Const } from './utils';

import { setup } from './services';
import { ApiHostService } from './services/api-host';

const SPEC_URL = 'es_swagger.json';
const API_URL = 'energystacks';

// const SPEC_URL = 'https://api.apis.guru/v2/openapi.yaml';
// const API_URL = 'api-guru';
// let BASE_URL = 'https://api.apis.guru/v2/';

const app = feathers();

// Would normally require `await`
setup(app);

// HELPERS
// const getSchema = (operation) =>
//   operation.requestBody.content['application/json'].schema;
// const getSchemaProperties = (schema) => schema.properties;

// const apiGuruTest = async (app: Application) => {
//   // 3. Mount a path/operation from the API (mounts app.servce('some-path-from-step-2') with all its methods like GET, POST, ...)
//   await app.service(API_URL).create({
//     operationId: '/list.json'
//   });
//   // console.log(`BF MY MOUNTED PATH INFO`, myMountedPathInfo);

//   // 4. Use mounted path
//   const result = await app.service(`${API_URL}/list.json`).find();
//   console.log(`BF MY MOUNTED PATH INFO => result for GET`, result);
// };

const esTest = async (app: Application) => {
  // 3. Mount a path/operation from the API (mounts app.servce('some-path-from-step-2') with all its methods like GET, POST, ...)
  // await (app.service(API_URL) as ApiHostService).create({
  //   path: '/locations/{locationId}'
  // });
  await (app.service(API_URL) as ApiHostService).create({
    path: '/locations'
  });
  // console.log(`BF MY MOUNTED PATH INFO`, myMountedPathInfo);

  // 4. Use mounted path
  const result = await app.service(`${API_URL}/locations`).find();
  console.log(`Result for GET "/locations"`, result);
};

const main = async () => {
  // 1. Register a new API
  await app.service(Const.OPEN_API_HOST_URL).create({
    specPath: SPEC_URL, // or the document itself
    identifier: API_URL
  });

  // 2. Inspect the registered API (Returns paths, operations, components, api doc, ...)
  await app.service(API_URL).find();
  // const myApiInfo = await app.service(API_URL).find();
  // console.log(`PATHS`, {
  //   paths: myApiInfo.paths
  // });
  // console.log(
  //   `operations => '/locations/{locationId}'`,
  //   myApiInfo.operations
  //     .filter((item) => item.path.startsWith('/locations'))
  //     .map((item) => {
  //       return {
  //         [item.method]: item.parameters
  //       };
  //     })
  // );
  // console.log(`OPERATIONS`, {
  //   ops: myApiInfo.operations
  // });

  // await apiGuruTest(app);
  await esTest(app);
};

setTimeout(() => {
  main();
}, 1000);
