import {
  Document,
  OpenAPIV3,
  OpenAPIV3_1,
  Operation
} from 'openapi-client-axios';

export interface OpenApiHostInformation {
  components?: OpenAPIV3.ComponentsObject | OpenAPIV3_1.ComponentsObject;
  document?: Document;
  operations?: Operation[];
  paths?: OpenAPIV3.PathsObject | OpenAPIV3_1.PathsObject;
  schemas:
    | {
        [key: string]: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
      }
    | Record<string, OpenAPIV3_1.SchemaObject>;
}

export interface MountDefinition {
  path?: string;
  operationId?: string;
}
