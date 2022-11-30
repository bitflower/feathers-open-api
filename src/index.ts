import { getApi } from './make-api';

const runMe = async () => {
  //   bla({ openApiSpecPath: 'es_swagger.json' });
  const apiClient = await getApi({
    openApiSpecPath: 'https://api.apis.guru/v2/openapi.yaml',
  });

  //   console.log(`BF PATHS`, apiClient.paths);

  //   apiClient.api.withServer('https://api.apis.guru/v2/');

  for (const [path, pathApi] of Object.entries(apiClient.paths)) {
    console.log(`BF PATHAPI for "${path}"`, pathApi);

    const { status, statusText, data } = await pathApi.get(null, null, {
      baseURL: 'https://api.apis.guru/v2/',
    });

    console.log(`BF RESULT for "${path}".get()`, { status, statusText }, data);
  }

  //   Object.entries(apiClient.paths).forEach(async ([path, pathApi]) => {
  //     console.log(`BF PATHAPI for "${path}"`, pathApi);
  //     const result = await pathApi.get(null, null, {
  //       baseURL: 'https://api.apis.guru/v2/',
  //     });

  //     console.log(`BF RESULT for "${path}".get()`, result);
  //   });
};

runMe();
