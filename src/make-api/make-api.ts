import OpenAPIClientAxios, { Document } from 'openapi-client-axios';

interface GetApiOptions {
  openApiSpecPath: string | Document;
}

export const getApi = async ({ openApiSpecPath }: GetApiOptions) => {
  const api = new OpenAPIClientAxios({
    definition: openApiSpecPath
  });

  const client = await api.init();
  // const client =  api.initSync();

  // const ops = api.getOperations();
  // console.log(`BF OPERATIONS`, ops);

  // const ops = [
  //   {
  //     operationId: 'listAPIs',
  //     tags: ['APIs'],
  //     summary: 'List all APIs',
  //     description:
  //       'List all APIs in the directory.\n' +
  //       'Returns links to OpenAPI specification for each API in the directory.\n' +
  //       'If API exist in multiple versions `preferred` one is explicitly marked.\n' +
  //       '\n' +
  //       'Some basic info from OpenAPI spec is cached inside each object.\n' +
  //       'This allows to generate some simple views without need to fetch OpenAPI spec for each API.\n',
  //     responses: { '200': [Object] },
  //     path: '/list.json',
  //     method: 'get',
  //     security: []
  //   },
  //   {
  //     operationId: 'getMetrics',
  //     summary: 'Get basic metrics',
  //     description:
  //       'Some basic metrics for the entire directory.\n' +
  //       'Just stunning numbers to put on a front page and are intended purely for WoW effect :)\n',
  //     tags: ['APIs'],
  //     responses: { '200': [Object] },
  //     path: '/metrics.json',
  //     method: 'get',
  //     security: []
  //   }
  // ];

  return client;
};
