import { Application } from '@feathersjs/feathers';

import { getApiClient } from '../../utils';
import { ApiHostService } from '../api-host';

import { OpenApiHostDefinition } from './open-api-host.interface';

interface SetupApiHostOptions {
  apiDefinition: OpenApiHostDefinition;
}

export const setupApi = async (app: Application, opts: SetupApiHostOptions) => {
  const { apiDefinition } = opts;
  const { identifier } = apiDefinition;

  // Create api client
  const apiClient = await getApiClient({
    openApiSpecPath: apiDefinition.specPath
  });

  const apiUrl = `${identifier}`;

  // Register ApiHost service
  app.use(apiUrl, new ApiHostService(app, apiDefinition, apiClient));

  //   let finalBaseUrl = baseUrl;
  //   if (apiClient.api.getBaseURL()) {
  //     finalBaseUrl = apiClient.api.getBaseURL();
  //   }
  //   console.log(`BF FINAL BASE`, finalBaseUrl);

  return apiClient;
};
