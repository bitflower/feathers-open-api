# feathers-open-api

Inspect OpenAPI-enabled (aka Swagger) APIs and mount them as Feathers services.

## About

This project is built for [FeathersJS](http://feathersjs.com). An open source web framework for building modern real-time applications.
It's based on [openapi-client-axios](https://github.com/anttiviljami/openapi-client-axios) and is a convenient layer to integrate APIs compliant with the **[OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification)** dynamically into feathers.js applications.

## Features

- Powered by Feathers 4
- Written in Typescript
- Register APIs from an OpenAPI URL or document
- Filter for operations, paths and schemas via `find()`
- Mount paths or operations as feathers services dynamically

## Installation and setup

```bash
npm i feathers-open-api
```

```typescript
// open-api.ts
import type { Application } from '@feathersjs/express';
import { setup, Const } from 'feathers-open-api';

// Optional
import hooks from './open-api-host.hooks';

let moduleExports = function(app: Application) {
  setup(app);
  const service = app.service(Const.OPEN_API_HOST_URL);

  // Optional
  service.hooks(hooks);
};

export default moduleExports;
```

```typescript
// app.ts
// Where you feathers app is initiliazed

import openApiHost from './open-api';

// Open Api Host (register the openapi host)
app.configure(openApiHost);
```

The service `open-api-host` will be available to register APIs.

## Example

### Register an API

```typescript
import { Const, OpenApiHostDefinition } from 'feathers-open-api'

const openApiHostService = app.service(Const.OPEN_API_HOST_URL);

// Define API
const myApi: OpenApiHostDefinition {
  specPath:
    'https://url-to-some-open-api-spec',
  identifier: 'my-api'
};

// Register API management endpoint at `/my-api` (used for inspection and mounting later on)
await openApiHostService.create(myApi);

// Get all registered APIs
const allApis = await openApiHostService.find({});
console.log('All registered APIs', allApis);>

/*
[
    {
        "definition": {
            "specPath": "https://url-to-some-open-api-spec",
            "identifier": "my-api",
            "document: {
                ...
            }
        }
    }
]
 */
```

### Inspect API

```typescript
const myApiSpecs = await app.service('my-api').find({});
console.log('Specification of my-api', myApiSpecs);

/*
{
    "components": {
        "schemas": [
            {
                "Car": {
                    ... json-schema
                },
            }
        ]
    },
    "document": {
        ... OpenApi document
    },
    "paths": {
        "/cars/{carId}": {
            "get": {
                "tags": [],
                "summary": "Get a car",
                "description": "Returns a car with the specific UID.",
                "operationId": "getCarByUid",
                "parameters": [
                    {
                        "name": "carId",
                        "in": "path",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Successful Operation",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Car"
                                }
                            }
                        }
                    },
                    "403": {
                        "description": "Forbidden"
                    },
                    "404": {
                        "description": "Car not found"
                    }
                }
            }
        }
    },
    "schemas": {
        // json-schemas definitions (extracted from `components`)
    }
}
 */

const myFilteredApiSpecs = await app.service('my-api').find({
    query: {
        operationId: 'getCarByUid'
    }
});
console.log(myFilteredApiSpecs);

/*
{
    "operations": [
        {
            "tags": [
                "Cars"
            ],
            "summary": "Get a car",
            "description": "Returns a car with the specific UID.",
            "operationId": "getCarByUid",
            "responses": {
                "201": {
                    "description": "Successful Operation",
                    "content": {
                        "application/json": {
                            "schema": {
                                ... resolved json-schema*
                            }
                        }
                    }
                },
                "400": {
                    "description": "Request contains duplicate names"
                },
                "403": {
                    "description": "Forbidden - User has no access"
                },
                "409": {
                    "description": "Conflict"
                }
            },
            "path": "/cars/{carId}",
            "method": "get",
            "security": [
                {
                    "bearerAuth": []
                }
            ]
        }
    ]
}
*/
```

> *resolved json-schema means that all nested, named schemas have been resolved into the main entry schema

### Mount operations

```typescript

/* 
 * Mount operation as feathers service
 * 
 * It will be available as service under `/my-api/PATH-OF-THE-OPERATION`.
*/
await app.service('my-api').create({
    operationId: 'getCarByUid'
})

const car = await app.service('my-api/cars').get('123e4567-e89b-12d3-a456-426614174000');
console.log('My car', car);

/*
{
    _id: 123e4567-e89b-12d3-a456-426614174000,
    model: 'Model 3',
    manufacturer: 'Tesla'
}
*/

```

## Roadmap

- [ ] User research reg. DX (e.g. Feathers Discord)
- [ ] Mounting
  - [ ] Paths
  - [ ] Operations
- [ ] Pass through `axios` config and request overwrites (for authentication, headers, ...)
- [ ] Tests
- [ ] Documentation

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run. It has full support for *Visual Studio Code*. You can use the debugger to set breakpoints.

## Help

For more information on all the things you can do, visit [FeathersJS](http://docs.feathersjs.com) and [CASL](https://casl.js.org/v5/en/).

## License

Licensed under the [MIT license](LICENSE).