import { MethodNotAllowed } from '@feathersjs/errors';
import { Id } from '@feathersjs/feathers';
import { Operation, UnknownOperationMethod } from 'openapi-client-axios';

const FAKE_AUTH =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiI1NDVkMDdiZS1jNWZlLTQxNzgtOWQ4Yy0yNzI4MjEyZGJmYjEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMzhlYTUzZmItOTExNy00NzY0LWFkYzYtMzFmODI4OTEwYjMwL3YyLjAiLCJpYXQiOjE2NzA1MzQ4OTEsIm5iZiI6MTY3MDUzNDg5MSwiZXhwIjoxNjcwNTM4NzkxLCJhaW8iOiJBVlFBcS84VEFBQUF0OVUxQXVRWUxsa2tVY0FUaEI5MFRpZkh0ak5Od1JDU1lObXJpLzZMQ2MxM2VzZTFXbjBpSXFOUjBUYm9lZlZrNmFVb09ZMzVoZnZObTc0QjJ2T2pJQXpYbkFtS2xManFkczQ4ekMrUG5jWT0iLCJlbWFpbCI6Im1hdHRoaWFzLm1heEBwMy1ncm91cC5jb20iLCJuYW1lIjoiTWF0dGhpYXMgTWF4IChQQVJUTkVSKSIsIm9pZCI6IjM1N2Y2YTZhLWQzZGMtNDBlMS1iZGVkLTY3NTdmNTViZGI5ZCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik0uTWF4LlBhcnRuZXJAcDMtZ3JvdXAuY29tIiwicmgiOiIwLkFUQUEtMVBxT0JlUlpFZXR4akg0S0pFTE1MNEhYVlQteFhoQm5Zd25LQ0V0djdFd0FCdy4iLCJzdWIiOiJwblhtcUZ3NVh2YlBqb244a3JEX1lMUDhVdDhoc2FORDVjM0JiYzNxMmc0IiwidGlkIjoiMzhlYTUzZmItOTExNy00NzY0LWFkYzYtMzFmODI4OTEwYjMwIiwidXRpIjoiSFkxTGlHTmpDa204NENjZXNXSm5BQSIsInZlciI6IjIuMCJ9.VTKaviM78578i0v7aKVu_W-NhgMlsKiNCvT8SUpAg0JGacDcnWLbtAlctr5XU57JT7xHmvdqvgW3B8xu71eS-eOHnCch4NSmxD2F81hYD7d5p-269f43HN5lGOnbdX_4F0eV2DZPW58iH-9AUfWslC3G42HhJaKVRC7EtFVU8MMvze0HwZGt4MQeGLozleRgOEcdz-cU0Qvrs1_bxKTi_DU6GzGgm0SagcUvFgTzDmcMOcdUAd7nOkotb2AzAzZx3tK-OgEJ0Iaie6_3LpTmJ2SBQ4BcJDDhHRMidEVVKnxdR2PgWmmROI28dEMZLoCol6REYWU81qLnlhwxKvF9lw';

// TODO: This should be the ExternalREST Service !!
// TODO: Each time this service is registered we should store it in `repos
// TODO: use `adapter-commons`?
export class MountedOperationService {
  private opFn: UnknownOperationMethod;
  private operation: Operation;
  private baseUrl: string;

  constructor(
    opFn: UnknownOperationMethod,
    operation: Operation,
    baseUrl: string
  ) {
    this.opFn = opFn;
    this.operation = operation;
    this.baseUrl = baseUrl;
  }

  /**
   * This is a `create` function because it represents "the creation of a call to the operation"
   */
  private async makeCall(...params) {
    console.log(`BF MOUNTED-OPERATION-SERVICE::FIND`, { params });

    const { data } = await this.opFn.call(null, null, null, {
      baseURL: this.baseUrl,
      headers: {
        'accept-encoding': '*', // Important, otherwise the ES API return strange characters => https://stackoverflow.com/questions/74623066/axios-response-data-weird-characters
        Authorization: `Bearer ${FAKE_AUTH}`
      }
    });

    return data;
  }

  // For reference: Service methods
  // async find(params: Params) {}
  // async get(id: Id, params: Params) {}
  // async create(data: any, params: Params) {}
  // async update(id: NullableId, data: any, params: Params) {}
  // async patch(id: NullableId, data: any, params: Params) {}
  // async remove(id: NullableId, params: Params) {}

  async find(params) {
    console.log(`BF FIND`, {
      params,
      requiredParams: this.operation.parameters
    });
    if (
      this.operation.method === 'get' &&
      !this.operation.path.includes('{')
      // &&
      // (!this.operation.parameters || this.operation.parameters.length === 0)
    ) {
      return this.makeCall(...params);
    } else {
      throw new MethodNotAllowed();
    }
  }

  async get(id: Id, params) {
    console.log(`BF GET`, { params });
    if (this.operation.method === 'get' && this.operation.path.includes('{')) {
      return this.makeCall(...params);
    } else {
      throw new MethodNotAllowed();
    }
  }
}
