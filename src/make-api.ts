import OpenAPIClientAxios from 'openapi-client-axios';

export const getApi = async ({
  openApiSpecPath
}: {
  openApiSpecPath: string;
}) => {
  const api = new OpenAPIClientAxios({
    definition: openApiSpecPath
  });
  //   console.log(`BF API`, { api });

  console.log(`BF BASE URL`, api.getBaseURL());

  const client = await api.init();

  //   console.log(`BF CLIENT`, { client });
  //   console.log(`BF PATHS`, client.paths);

  return client;

  //   const result = await client.paths[`/locations`].get();

  //   console.log('Here is pet id:1 from the api', result.data);
};
