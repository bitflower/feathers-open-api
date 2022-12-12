import OpenAPIClientAxios, { Document } from 'openapi-client-axios';

interface GetApiOptions {
  openApiSpecPath: string | Document;
}

export const getApiClient = async ({ openApiSpecPath }: GetApiOptions) => {
  const api = new OpenAPIClientAxios({
    definition: openApiSpecPath
  });

  const client = await api.init();

  // TODO: Use Sync method (requires providing a document instead of a spec URL)
  // const client =  api.initSync();

  return client;
};
