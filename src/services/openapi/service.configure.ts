import { Application } from '@feathersjs/feathers';
import { Document } from 'openapi-client-axios';

import { getApi } from '../../make-api';

import { OpenApiService } from './service.class';

interface SetupOptions {
  definition: string | Document;
  serviceUrls: {
    [source: string]: string;
  };
  baseUrl?: string;
}

export const setup = async (
  app: Application,
  { baseUrl, definition, serviceUrls }: SetupOptions
) => {
  const apiClient = await getApi({
    openApiSpecPath: definition
  });

  //   let finalBaseUrl = baseUrl;
  //   if (apiClient.api.getBaseURL()) {
  //     finalBaseUrl = apiClient.api.getBaseURL();
  //   }
  //   console.log(`BF FINAL BASE`, finalBaseUrl);

  Object.entries(serviceUrls).forEach(([path, target]) => {
    // console.log(`BF PATH => TARGET`, { path, target, paths: apiClient.paths });

    if (apiClient.paths[path]) {
      console.log(`BF REGISTERING SERVICE at "${target}"`, { path, target });
      const pathApi = apiClient.paths[path];
      const service = new OpenApiService(pathApi, baseUrl);
      app.use(target, service);
    }
  });
};
