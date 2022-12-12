import { Application } from '@feathersjs/feathers';

import { Const } from '../utils';
// import { Document } from 'openapi-client-axios';

// import { getApi } from '../make-api';

import { OpenApiHostService } from './open-api-host/open-api-host-service.class';
// import { MountedPathService } from './mounted-path/mounted-path-service.class';

// interface SetupOptions {
//   definition: string | Document;
//   serviceUrls: {
//     [source: string]: string;
//   };
//   baseUrl?: string;
// }

export const setup = async (
  app: Application
  // { baseUrl, definition, serviceUrls }: SetupOptions
) => {
  app.use(Const.OPEN_API_HOST_URL, new OpenApiHostService(app));
};
