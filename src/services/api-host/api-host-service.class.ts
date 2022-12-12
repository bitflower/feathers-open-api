import { GeneralError } from '@feathersjs/errors';
import { Application, Params } from '@feathersjs/feathers';
import { OpenAPIClient } from 'openapi-client-axios';

import { OpenApiHostDefinition } from '../open-api-host/open-api-host.interface';

import { filterOperations, filterPaths, filterSchemas } from './filters';
import { MountDefinition, OpenApiHostInformation } from './interfaces';
import { mount } from './mount-path';

// UTILS
const verifyData = (data: MountDefinition) => {
  if (!data) {
    throw new GeneralError(`API host definition is required.`);
  }
  if (!data.path && !data.operationId) {
    throw new GeneralError(`path or operationId is required.`);
  }
};

export class ApiHostService {
  private app: Application;
  private apiClient: OpenAPIClient;
  private apiDefinition: OpenApiHostDefinition;
  //   private baseUrl: string;

  // TODO: What is baseUrl?
  constructor(
    app: Application,
    apiDefinition: OpenApiHostDefinition,
    apiClient: OpenAPIClient
  ) {
    this.app = app;
    this.apiClient = apiClient;
    this.apiDefinition = apiDefinition;
    // this.baseUrl = baseUrl;
  }

  /**
   * Mount an operation/path
   */
  async create(data: MountDefinition) {
    console.log(`api-host-service.class.ts::create`, { data });
    verifyData(data);

    await mount(this.app, this.apiClient, data, this.apiDefinition.identifier);

    return;
  }

  /**
   * Get api specs
   */
  async find(params: Params): Promise<OpenApiHostInformation> {
    const {
      query: { components, document, operation, path, schema }
    } = params;

    const all =
      components === undefined &&
      document === undefined &&
      operation === undefined &&
      path === undefined &&
      schema === undefined
        ? {
            components: this.apiClient.api.document.components,
            document: this.apiClient.api.document,
            operations: this.apiClient.api.getOperations(),
            paths: this.apiClient.api.document.paths,
            schemas: this.apiClient.api.document.components.schemas
          }
        : {
            ...(components !== undefined && {
              components: this.apiClient.api.document.components
            }),
            ...(document !== undefined && {
              document: this.apiClient.api.document
            }),
            ...(operation !== undefined && {
              operations: filterOperations(operation, this.apiClient)
            }),
            ...(path !== undefined && {
              paths: filterPaths(path, this.apiClient)
            }),
            ...(schema !== undefined && {
              schemas: filterSchemas(schema, this.apiClient)
            })
          };

    return all;
  }
}
