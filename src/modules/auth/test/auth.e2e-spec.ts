import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../app.module';

jest.setTimeout(30000);

describe('Auth e2e ', () => {
  let app: INestApplication;
  let token = '';
  const { TEST_ADMIN, TEST_ADMIN_PASSWORD } = process.env;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`Should validate user credits and return jwt token`, async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({username: TEST_ADMIN, password: TEST_ADMIN_PASSWORD})
      .expect(201).then((res) => {
        token = res.body.access_token;
        expect(token).toBeDefined();
      });
  });

  it('Should validate jwt token and return users', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .set({Authorization: 'Bearer ' + token})
      .query({
        page: 1, itemsPerPage: 1,
      })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
