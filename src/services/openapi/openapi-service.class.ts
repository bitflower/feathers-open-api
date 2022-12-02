import {
  OpenAPIClient,
  OpenAPIV3,
  OpenAPIV3_1,
  Operation
} from 'openapi-client-axios';

// type PathApi = {
//   [method in HttpMethod]?: UnknownOperationMethod;
// };

interface OpenApiHostInformation {
  components: OpenAPIV3.ComponentsObject | OpenAPIV3_1.ComponentsObject;
  //   document: Document;
  operations: Operation[];
}

export class OpenApiHostService {
  apiClient: OpenAPIClient;
  baseUrl: string;

  constructor(apiClient: OpenAPIClient, baseUrl: string) {
    this.apiClient = apiClient;
    this.baseUrl = baseUrl;
  }

  async find(): Promise<OpenApiHostInformation> {
    // Return
    // - whole API document
    // - the schema components
    // - api client
    // and let's filter it by using query params

    return {
      components: this.apiClient.api.document.components,
      //   document: this.apiClient.api.document,
      operations: this.apiClient.api.getOperations()
    };
  }

  //   async create(data: Pick<Message, 'text'>) {
  //     // The new message is the data text with a unique identifier added
  //     // using the messages length since it changes whenever we add one
  //     const message: Message = {
  //       id: this.messages.length,
  //       text: data.text
  //     };

  //     // Add new message to the list
  //     this.messages.push(message);

  //     return message;
  //   }
}
