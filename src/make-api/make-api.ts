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

  return client;
};
