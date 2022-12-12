export interface OpenApiHostDefinition {
  /**
   * Link to the OpenAPI spec file
   */
  specPath: string; // or the document itself

  /**
   * Unquie string identifying the API
   */
  identifier: string;
}
