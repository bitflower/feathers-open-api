import { getApi } from './make-api';

const runMe = async () => {
  const SPEC_URL = 'https://api.apis.guru/v2/openapi.yaml';
  let BASE_URL = 'https://api.apis.guru/v2/';

  //   const SPEC_URL = 'es_swagger.json';
  //   let BASE_URL = 'https://api.apis.guru/v2/';

  const apiClient = await getApi({
    openApiSpecPath: SPEC_URL
  });

  if (apiClient.api.getBaseURL()) {
    BASE_URL = apiClient.api.getBaseURL();
  }
  console.log(`BF BASE URL`, apiClient.api.getBaseURL());

  //   console.log(`BF PATHS`, apiClient.paths);

  // DIDN'T WORK
  //   apiClient.api.withServer('https://api.apis.guru/v2/');

  for (const [path, pathApi] of Object.entries(apiClient.paths)) {
    console.log(`BF PATHAPI for "${path}"`, pathApi);

    const { status, statusText, data } = await pathApi.get(null, null, {
      baseURL: BASE_URL
    });

    console.log(`BF RESULT for "${path}".get()`, { status, statusText }, data);
  }
};

runMe();
