import request from 'supertest';

import { DataSource } from 'typeorm';
import AppDataSource from '../../data-source';

import app from '../../app';
import { createOtherUserMockSucess, createUserInvalidMaxNumberTelephoneInvalidMockError, createUserInvalidMinNumberTelephoneInvalidMockError, createUserMissingMandatoryDataMockError, createUserMockInvalidEmailMockError, createUserMockSucess } from '../mocks/user/create.user';
import { initiSessionUserFoundDataMockError, initiSessionUserInvalidEmailMockError, initiSessionUserInvalidPasswordMockError, initiSessionUserSucess } from '../mocks/user/session.user';
import { updateUserEmailAlreadyUsedMockError, updateUserMockSucess } from '../mocks/user/update.user';


describe('/user', () => {
  let connection: DataSource;

  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      })
  })

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /user - Create user with invalid email ERROR', async () => {
    const user = await request(app)
      .post('/user')
      .send(createUserMockInvalidEmailMockError)

    expect(user.status).toBe(400);
    expect(user.body.message[0]).toEqual('Email inválido');
  })

  test('POST /user - Create user invalid max number telephone ERROR', async () => {
    const user = await request(app)
      .post('/user')
      .send(createUserInvalidMaxNumberTelephoneInvalidMockError)

    expect(user.status).toBe(400);
    expect(user.body.message[0]).toEqual('Deve conter no máximo 14 caracteres');
  })

  test('POST /user - Create user invalid min number telephone ERROR', async () => {
    const user = await request(app)
      .post('/user')
      .send(createUserInvalidMinNumberTelephoneInvalidMockError)

    expect(user.status).toBe(400);
    expect(user.body.message[0]).toEqual('Deve conter no minimo 12 caracteres');
  })

  test('POST /user - Create user missing mandatory data ERROR', async () => {
    const user = await request(app)
      .post('/user')
      .send(createUserMissingMandatoryDataMockError)

    expect(user.status).toBe(400);
    expect(user.body.message[0]).toEqual('Deve conter o nome completo');
    expect(user.body.message[1]).toEqual('Deve conter um email');
    expect(user.body.message[2]).toEqual('Deve conter um senha');
    expect(user.body.message[3]).toEqual("Deve conter um numero no seguinte formato 'PREFIXO DDD 00000000' ex: 554100000000");
  })

  test('POST /user - Create user', async () => {
    const user = await request(app)
      .post('/user')
      .send(createUserMockSucess)

    expect(user.status).toBe(201);
    expect(user.body).toHaveProperty('message');
    expect(user.body).toHaveProperty('user');
    expect(user.body.message).toEqual('Usuario criado');
    expect(user.body.user.fullName).toEqual('João');
    expect(user.body.user.email).toEqual('joao@gmail.com');
    expect(user.body.user.telephone).toEqual('5541000000000');
  })

  test('POST /user - Create user duplicate ERROR', async () => {
    const user = await request(app)
      .post('/user')
      .send(createUserMockSucess)

    expect(user.status).toBe(403);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message).toEqual('Usuario já existe');
  })

  test('POST /user - Create other user', async () => {
    const user = await request(app)
      .post('/user')
      .send(createOtherUserMockSucess)

    expect(user.status).toBe(201);
    expect(user.body).toHaveProperty('message');
    expect(user.body).toHaveProperty('user');
    expect(user.body.message).toEqual('Usuario criado');
    expect(user.body.user.fullName).toEqual('Lucas');
    expect(user.body.user.email).toEqual('lucas@gmail.com');
    expect(user.body.user.telephone).toEqual('5541000000000');
  })

  test('POST /session - init session found data ERROR', async () => {
    const user = await request(app)
      .post('/session')
      .send(initiSessionUserFoundDataMockError)

    expect(user.status).toBe(400);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message[0]).toEqual('Deve conter um email');
    expect(user.body.message[1]).toEqual('Deve conter uma senha');
  })

  test('POST /session - init session invalid email ERROR', async () => {
    const user = await request(app)
      .post('/session')
      .send(initiSessionUserInvalidEmailMockError)

    expect(user.status).toBe(400);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message[0]).toEqual('Email inválido');
  })

  test('POST /session - init session invalid password ERROR', async () => {
    const user = await request(app)
      .post('/session')
      .send(initiSessionUserInvalidPasswordMockError)

    expect(user.status).toBe(400);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message).toEqual('Email/senha inváida');
  })

  test('POST /session - init session', async () => {
    const user = await request(app)
      .post('/session')
      .send(initiSessionUserSucess)

    expect(user.status).toBe(200);
    expect(user.body).toHaveProperty('message');
    expect(user.body).toHaveProperty('token');
    expect(user.body).toHaveProperty('user');
    expect(user.body.user).toHaveProperty('id');
    expect(user.body.user).toHaveProperty('fullName');
    expect(user.body.user).toHaveProperty('email');
    expect(user.body.user).toHaveProperty('telephone');
    expect(user.body.user).toHaveProperty('createdAt');
    expect(user.body.user).toHaveProperty('updatedAt');

    token = user.body.token
  })

  test('GET /users - List my user', async () => {
    const user = await request(app)
      .get('/user')

      expect(user.status).toBe(401);
      expect(user.body).toHaveProperty('message');
      expect(user.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  })

  test('GET /users - List my user', async () => {
    const user = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${23132}`);

      expect(user.status).toBe(401);
      expect(user.body).toHaveProperty('message');
      expect(user.body.message).toEqual('Token invalido');
  
  })

  test('GET /users - List my user', async () => {
    const user = await request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`);

    expect(user.status).toBe(200);
    expect(user.body).toHaveProperty('message');
    expect(user.body).toHaveProperty('amountOfContacts');
    expect(user.body).toHaveProperty('user');
    expect(user.body.message).toEqual('Meu perfil');
    expect(user.body.user).toHaveProperty('id');
    expect(user.body.user).toHaveProperty('fullName');
    expect(user.body.user).toHaveProperty('email');
    expect(user.body.user).toHaveProperty('telephone');
    expect(user.body.user).toHaveProperty('createdAt');
    expect(user.body.user).toHaveProperty('updatedAt');
  })

  test('PATCH /users - Update user found token', async () => {
    const user = await request(app)
      .patch('/user')
      .send(updateUserEmailAlreadyUsedMockError)

    expect(user.status).toBe(401);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  })

  test('PATCH /users - Update user invalid token', async () => {
    const user = await request(app)
      .patch('/user')
      .send(updateUserEmailAlreadyUsedMockError)
      .set('Authorization', `Bearer ${23132}`);

    expect(user.status).toBe(401);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message).toEqual('Token invalido');
  })

  test('PATCH /users - Update user email already used ERROR', async () => {
    const user = await request(app)
      .patch('/user')
      .send(updateUserEmailAlreadyUsedMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(user.status).toBe(400);
    expect(user.body).toHaveProperty('message');
    expect(user.body.message).toEqual('Email indisponível');
  })

  test('PATCH /users - Update user', async () => {
    const user = await request(app)
      .patch('/user')
      .send(updateUserMockSucess)
      .set('Authorization', `Bearer ${token}`);

    expect(user.status).toBe(200);
    expect(user.body).toHaveProperty('message');
    expect(user.body).toHaveProperty('user');
    expect(user.body.message).toEqual('Usuario atualizado');
    expect(user.body.user).toHaveProperty('id');
    expect(user.body.user).toHaveProperty('fullName');
    expect(user.body.user).toHaveProperty('email');
    expect(user.body.user).toHaveProperty('telephone');
    expect(user.body.user).toHaveProperty('createdAt');
    expect(user.body.user).toHaveProperty('updatedAt');
    expect(user.body.user.fullName).toEqual('JoãoAtualizado');
    expect(user.body.user.email).toEqual('joaoAtualizado@gmail.com');
    expect(user.body.user.telephone).toEqual('5541111111111');
  })

  test('DELETE /users - DELETE user found token', async () => {
    const user = await request(app)
      .delete('/user')

      expect(user.status).toBe(401);
      expect(user.body).toHaveProperty('message');
      expect(user.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  })

  test('DELETE /users - DELETE user found token', async () => {
    const user = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${23132}`);

      expect(user.status).toBe(401);
      expect(user.body).toHaveProperty('message');
      expect(user.body.message).toEqual('Token invalido');
  })

  test('DELETE /users - DELETE user', async () => {
    const user = await request(app)
      .delete('/user')
      .set('Authorization', `Bearer ${token}`);

      expect(user.status).toBe(200);
      expect(user.body).toHaveProperty('message');
      expect(user.body.message).toEqual('Usuario removido');
  })
})