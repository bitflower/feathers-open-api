import feathers from '@feathersjs/feathers';

import { setup } from './services';

const SPEC_URL = 'es_swagger.json';
let BASE_URL = 'https://api.apis.guru/v2/';
// const SPEC_URL = 'https://api.apis.guru/v2/openapi.yaml';
// let BASE_URL = 'https://api.apis.guru/v2/';

const app = feathers();

setup(app, {
  definition: SPEC_URL,
  baseUrl: BASE_URL,
  serviceUrls: {
    ['/list.json']: 'list'
  }
});

// HELPERS
const getSchema = (operation) =>
  operation.requestBody.content['application/json'].schema;
// const getSchemaProperties = (schema) => schema.properties;

const main = async () => {
  //   app.service('list').on('created', (message: Message) => {
  //     console.log('A new message has been created', message);
  //   });
  const openApiInfo = await app.service('openapi-host').find();
  //   console.log('All operations', openApiInfo);

  const bla = (openApiInfo.operations as any[])
    .filter((item) => ['post', 'put'].includes(item.method))
    .reduce((all, { operationId, method, requestBody }) => {
      console.log(`BF ALL`, all);
      all[`${operationId}:${method}`] = {
        requestBody
      };

      return all;
    }, {});
  console.log('All operations', bla);
  console.log(
    'All operation 1 => schema',
    getSchema(Object.values(bla)[0])
    // getSchemaProperties(getSchema(Object.values(bla)[0]))
    // (Object.values(bla)[0] as any).requestBody.content['application/json']
  );

  //   const apis = await app.service('list').find();
  //   console.log('All apis', apis);
};

setTimeout(() => {
  main();
}, 1000);
