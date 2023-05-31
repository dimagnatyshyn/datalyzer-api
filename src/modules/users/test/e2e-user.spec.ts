import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../../app.module';

jest.setTimeout(30000);

describe('User e2e ', () => {
  const { TEST_ADMIN, TEST_ADMIN_PASSWORD } = process.env;
  let app: INestApplication;
  let token = '';

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
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

  it(`Should change user password`, async () => {
    return request(app.getHttpServer())
      .put('/users/change-password')
      .set({Authorization: 'Bearer ' + token})
      .send({password: '123456', old_password: TEST_ADMIN_PASSWORD})
      .expect(200);
  });

  it(`Should return error`, async () => {
    return request(app.getHttpServer())
      .put('/users/change-password')
      .set({Authorization: 'Bearer ' + token})
      .send({password: '123456', old_password: '1488228'})
      .expect(400);
  });

  it(`Should change user password back`, async () => {
    return request(app.getHttpServer())
      .put('/users/change-password')
      .set({Authorization: 'Bearer ' + token})
      .send({password: TEST_ADMIN_PASSWORD, old_password: '123456'})
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
