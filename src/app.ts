import feathers from '@feathersjs/feathers';

import { setup } from './services';

const SPEC_URL = 'https://api.apis.guru/v2/openapi.yaml';
let BASE_URL = 'https://api.apis.guru/v2/';

const app = feathers();

setup(app, {
  definition: SPEC_URL,
  baseUrl: BASE_URL,
  serviceUrls: {
    ['/list.json']: 'list'
  }
});

const main = async () => {
  //   app.service('list').on('created', (message: Message) => {
  //     console.log('A new message has been created', message);
  //   });

  const messages = await app.service('list').find();
  console.log('All messages', messages);
};

setTimeout(() => {
  main();
}, 1000);
