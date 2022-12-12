import { Application } from '@feathersjs/feathers';
import { OpenAPIClient } from 'openapi-client-axios';

import { dashed } from '../../utils';
import { MountedPathService } from '../mounted-service';
import { MountedOperationService } from '../mounted-service/mounted-operation-service.class';

import { MountDefinition } from './interfaces';

export const mount = (
  app: Application,
  apiClient: OpenAPIClient,
  { path, operationId }: MountDefinition,
  identifier: string
) => {
  console.log(`mount-path.ts::mount`, { path, operationId, identifier });

  if (path) {
    const mountablePath = apiClient.paths[path];

    console.log(`Found mountable path`, { mountablePath });

    if (mountablePath) {
      //   console.log(`BF REGISTERING SERVICE at "${target}"`, { path, target });
      const service = new MountedPathService(
        mountablePath,
        apiClient.api.getBaseURL()
      );

      const mountablePathUrl = `${identifier}${path}`;
      console.log(`Registering "${mountablePathUrl}"`);
      app.use(mountablePathUrl, service);
      // console.log(`After registering`);
    }
  }

  if (operationId) {
    console.log(`mount-path.ts::mount => operationId`, {
      operationId,
      identifier
    });
    const opFn = apiClient[operationId];
    console.log(`BF OP FN`, { opFn });
    const operation = apiClient.api.getOperation(operationId);
    console.log(`mount-path.ts::mount => operation`, {
      operation,
      bla: apiClient[operationId]
    });
    const { method, path, responses, parameters, requestBody, security } =
      operation;

    const mountableOperationUrl = `${identifier}/${dashed(operationId)}`;

    console.log(`BF YO`, {
      mountableOperationUrl,
      parameters,
      method,
      path,
      responses,
      requestBody,
      security
    });

    const service = new MountedOperationService(
      opFn,
      operation,
      apiClient.api.getBaseURL()
    );
    console.log(`Registering "${mountableOperationUrl}"`);
    app.use(mountableOperationUrl, service);
  }
};
