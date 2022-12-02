import { Application } from '@feathersjs/feathers';
import { Document } from 'openapi-client-axios';

import { getApi } from '../../make-api';
import { OpenApiHostService } from './openapi-service.class';

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
  // Create api client
  // TODO: Use sync method (by proving already read openapi document)
  const apiClient = await getApi({
    openApiSpecPath: definition
  });

  // TODO: Make configurable
  const CUSTOM_API_URL = 'openapi-host';
  // Register OpenApiHost service
  app.use(CUSTOM_API_URL, new OpenApiHostService(apiClient, baseUrl));

  //   let finalBaseUrl = baseUrl;
  //   if (apiClient.api.getBaseURL()) {
  //     finalBaseUrl = apiClient.api.getBaseURL();
  //   }
  //   console.log(`BF FINAL BASE`, finalBaseUrl);

  // Register mapped paths as services
  Object.entries(serviceUrls).forEach(([path, target]) => {
    // console.log(`BF PATH => TARGET`, { path, target, paths: apiClient.paths });

    if (apiClient.paths[path]) {
      //   console.log(`BF REGISTERING SERVICE at "${target}"`, { path, target });
      const pathApi = apiClient.paths[path];
      const service = new OpenApiService(pathApi, baseUrl);
      // TODO: Use nested URL including CUSTOM_API_URL?
      app.use(target, service);
    }
  });
};
