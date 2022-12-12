import { GeneralError } from '@feathersjs/errors';
import { Application } from '@feathersjs/feathers';
import { OpenAPIClient } from 'openapi-client-axios';

import { OpenApiHostDefinition } from './open-api-host.interface';
import { setupApi } from './setup-api-host';

// UTILS
const verifyData = (data: OpenApiHostDefinition) => {
  if (!data) {
    throw new GeneralError(`Open API host definition is required.`);
  }

  if (!data.specPath) {
    throw new GeneralError(
      `Open API host definition requires a spec URL or document.`
    );
  }

  if (!data.identifier) {
    throw new GeneralError(
      `Open API host definition requires a unique identifier for each registered API.`
    );
  }
};

interface ApiInstance {
  definition: OpenApiHostDefinition;
  client: OpenAPIClient;
}

export class OpenApiHostService {
  private app: Application;
  private apis: ApiInstance[] = [];

  constructor(app: Application) {
    this.app = app;
  }

  async create(data: OpenApiHostDefinition) {
    verifyData(data);

    const client = await setupApi(this.app, {
      apiDefinition: data
    });
    this.apis.push({
      definition: data,
      client
    });

    return;
  }

  async find() {
    return this.apis;
  }
}
