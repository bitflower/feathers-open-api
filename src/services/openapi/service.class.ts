import { HttpMethod, UnknownOperationMethod } from 'openapi-client-axios';

type PathApi = {
  [method in HttpMethod]?: UnknownOperationMethod;
};

// TODO: This should be the ExternalREST Service !!
// TODO: Each time this service is registered we should store it in `repos
// TODO: use `adapter-commons`?
export class OpenApiService {
  //   messages: Message[] = [];
  pathApi: PathApi;
  baseUrl: string;

  constructor(pathApi: PathApi, baseUrl: string) {
    this.pathApi = pathApi;
    this.baseUrl = baseUrl;
  }

  async find() {
    // console.log(`BF SERVICE:FIND`);

    // Just return all our messages
    // return this.messages;
    // this.pathApi.get();
    const { data } = await this.pathApi.get(null, null, {
      baseURL: this.baseUrl
    });

    return data;
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
