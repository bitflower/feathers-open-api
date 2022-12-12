import { HttpMethod, UnknownOperationMethod } from 'openapi-client-axios';

type PathApi = {
  [method in HttpMethod]?: UnknownOperationMethod;
};

const FAKE_AUTH =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiI1NDVkMDdiZS1jNWZlLTQxNzgtOWQ4Yy0yNzI4MjEyZGJmYjEiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMzhlYTUzZmItOTExNy00NzY0LWFkYzYtMzFmODI4OTEwYjMwL3YyLjAiLCJpYXQiOjE2NzA1MTE5OTUsIm5iZiI6MTY3MDUxMTk5NSwiZXhwIjoxNjcwNTE1ODk1LCJhaW8iOiJBVlFBcS84VEFBQUFmTE4zTHJ5bTUzcUZaUGRJZk5RTWdQYWNzT0J6Yisza3VuSlVSejBoQ3l0ZVFrUENsRTYxSTdzVzRMc1plbzl6R0NKMlo5Z01aOWE5TExYaU53eGw1ZHRrL2hhaU5CR0NIaTgzZWJxUjJjUT0iLCJlbWFpbCI6Im1hdHRoaWFzLm1heEBwMy1ncm91cC5jb20iLCJuYW1lIjoiTWF0dGhpYXMgTWF4IChQQVJUTkVSKSIsIm9pZCI6IjM1N2Y2YTZhLWQzZGMtNDBlMS1iZGVkLTY3NTdmNTViZGI5ZCIsInByZWZlcnJlZF91c2VybmFtZSI6Ik0uTWF4LlBhcnRuZXJAcDMtZ3JvdXAuY29tIiwicmgiOiIwLkFUQUEtMVBxT0JlUlpFZXR4akg0S0pFTE1MNEhYVlQteFhoQm5Zd25LQ0V0djdFd0FCdy4iLCJzdWIiOiJwblhtcUZ3NVh2YlBqb244a3JEX1lMUDhVdDhoc2FORDVjM0JiYzNxMmc0IiwidGlkIjoiMzhlYTUzZmItOTExNy00NzY0LWFkYzYtMzFmODI4OTEwYjMwIiwidXRpIjoiZm9XQThBaXBra21aS05Mbjg4MUxBQSIsInZlciI6IjIuMCJ9.U3RBtTBKAHtuKLoOmIA8W83t_hhMyn64n66JpsMuoLMbQVRmX9terU3yitEIurXuLdlXKNHVrmPHRlCJEgLjon7U0e9EDTAmT1x_80iJAhT2nKV5kMqYhkqbU7km_LSNdDYYWnwnmDEeb37umfuKiE8tJgbH8wI0fkfZQfv7I5ZCQac6af6zy62JPdzdwoDGrUcya3OnGivZlqQleujB8y5rHzs6174MLeyNR9A2VHXRF9VjSU7BpL5nch6GlNDQHgBSG_biCBRvKCr2dRZFZHp1D-xHgStDSoALdCqYpUyfJ-zfjVcW_5EQIwyv2cr-OhpJ8-6c7jQvTfDSLJOQkw';
// TODO: This should be the ExternalREST Service !!
// TODO: Each time this service is registered we should store it in `repos
// TODO: use `adapter-commons`?
export class MountedPathService {
  private pathApi: PathApi;
  private baseUrl: string;

  constructor(pathApi: PathApi, baseUrl: string) {
    this.pathApi = pathApi;
    this.baseUrl = baseUrl;
  }

  async find() {
    // console.log(`BF MOUNTED-SERVICE::FIND`);
    // this.pathApi.get();
    const { data } = await this.pathApi.get(null, null, {
      baseURL: this.baseUrl,
      headers: {
        'accept-encoding': '*', // Important, otherwise the ES API return strange characters => https://stackoverflow.com/questions/74623066/axios-response-data-weird-characters
        Authorization: `Bearer ${FAKE_AUTH}`
      }
    });

    return data;
  }
}
