import { OpenAPIClient } from 'openapi-client-axios';

export const filterOperations = (
  operation: string,
  apiClient: OpenAPIClient
) => {
  return operation !== ''
    ? apiClient.api
        .getOperations()
        .filter((item) =>
          item.operationId.toLowerCase().includes(operation.toLowerCase())
        )
    : apiClient.api.getOperations();
};

export const filterPaths = (path: string, apiClient: OpenAPIClient) => {
  return path !== ''
    ? Object.entries(apiClient.api.document.paths)
        .filter(([key]) => key.includes(path))
        .reduce(
          (current, [key, value]) => ({
            ...current,
            [key]: value
          }),
          {}
        )
    : apiClient.api.document.paths;
};

export const filterSchemas = (schema: string, apiClient: OpenAPIClient) => {
  return schema !== ''
    ? Object.entries(apiClient.api.document.components.schemas)
        .filter(([key]) => key.includes(schema))
        .reduce(
          (current, [key, value]) => ({
            ...current,
            [key]: value
          }),
          {}
        )
    : apiClient.api.document.components.schemas;
};
