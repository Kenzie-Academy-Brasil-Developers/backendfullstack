import request from 'supertest';

import { DataSource } from 'typeorm';
import AppDataSource from '../../data-source';

import app from '../../app';
import { createUserMockSucess } from '../mocks/user/create.user';
import { initiSessionUserSucess } from '../mocks/user/session.user';
import { createContactDuplicateEmailMockError, createContactDuplicatePhoneMockError, createContactInvalidMaxNumberTelephoneInvalidMockError, createContactInvalidMinNumberTelephoneInvalidMockError, createContactMissingMandatoryDataMockError, createContactMockInvalidEmailMockError, createContactMockSuccess, createOtherContactMockSuccess } from '../mocks/contact/create.contact';
import { updateContactEmailAlreadyUsedMockError, updateContactMockSucess, updateContactTelephoneAlreadyUsedMockError } from '../mocks/contact/update.contact';


describe('/contact', () => {
  let connection: DataSource;

  let token: string;
  let contactOneId: string
  let contactTwoId: string

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });

    const user = await request(app)
      .post('/user')
      .send(createUserMockSucess)

    expect(user.status).toBe(201);

    const session = await request(app)
      .post('/session')
      .send(initiSessionUserSucess)

    expect(session.status).toBe(200);

    token = session.body.token
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /contact - Create contact found token ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactMockInvalidEmailMockError)

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  });

  test('POST /contact - Create contact invalid token ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactMockInvalidEmailMockError)
      .set('Authorization', `Bearer ${1212}`);

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Token invalido');
  });

  test('GET /contact - List contact found token ERROR', async () => {
    const contact = await request(app)
      .get('/contact')
      .send(createContactMockInvalidEmailMockError)

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  });

  test('GET /contact - List contact invalid token ERROR', async () => {
    const contact = await request(app)
      .get('/contact')
      .send(createContactMockInvalidEmailMockError)
      .set('Authorization', `Bearer ${1212}`);

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Token invalido');
  });

  test('PATCH /contact/:id - Update contact found token ERROR', async () => {
    const contact = await request(app)
      .patch('/contact/:id')

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  });

  test('PATCH /contact/:id - Update contact invalid token ERROR', async () => {
    const contact = await request(app)
      .patch('/contact/:id')
      .send(createContactMockInvalidEmailMockError)
      .set('Authorization', `Bearer ${1212}`);

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Token invalido');
  });
  test('DELETE /contact/:id - Delete contact found token ERROR', async () => {
    const contact = await request(app)
      .delete('/contact/:id')

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Usuario deve estar logado para acessar o recurso');
  });

  test('DELETE /contact/:id - Delete contact invalid token ERROR', async () => {
    const contact = await request(app)
      .delete('/contact/:id')
      .send(createContactMockInvalidEmailMockError)
      .set('Authorization', `Bearer ${1212}`);

      expect(contact.status).toBe(401);
      expect(contact.body).toHaveProperty('message');
      expect(contact.body.message).toEqual('Token invalido');
  });

  test('POST /contact - Create contact mock invalid email ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactMockInvalidEmailMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message[0]).toEqual('Email inválido');
  });

  test('POST /contact - Create contact invalid max number telephone ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactInvalidMaxNumberTelephoneInvalidMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message[0]).toEqual('Deve conter no máximo 14 caracteres');
  });

  test('POST /contact - Create contact invalid min number telephone ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactInvalidMinNumberTelephoneInvalidMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message[0]).toEqual('Deve conter no minimo 12 caracteres');
  });

  test('POST /contact - Create contact found data ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactMissingMandatoryDataMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message[0]).toEqual('Deve conter o nome completo');
    expect(contact.body.message[1]).toEqual('Deve conter um email');
    expect(contact.body.message[2]).toEqual("Deve conter um numero no seguinte formato 'PREFIXO DDD 00000000' ex: 554100000000");
  });

  test('POST /contact - Create contact SUCCESS', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactMockSuccess)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(201);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Contato adicionado');
    expect(contact.body).toHaveProperty('contact');
    expect(contact.body.contact).toHaveProperty('id');
    expect(contact.body.contact).toHaveProperty('fullName');
    expect(contact.body.contact).toHaveProperty('email');
    expect(contact.body.contact).toHaveProperty('telephone');
    expect(contact.body.contact).toHaveProperty('createdAt');
    expect(contact.body.contact).toHaveProperty('updatedAt');
    expect(contact.body.contact.fullName).toEqual('Fernando');
    expect(contact.body.contact.email).toEqual('fernando@gmail.com');
    expect(contact.body.contact.telephone).toEqual('5541000000000');

    contactOneId = contact.body.contact.id
  });

  test('POST /contact - Create contact SUCCESS', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createOtherContactMockSuccess)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(201);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Contato adicionado');
    expect(contact.body).toHaveProperty('contact');
    expect(contact.body.contact).toHaveProperty('id');
    expect(contact.body.contact).toHaveProperty('fullName');
    expect(contact.body.contact).toHaveProperty('email');
    expect(contact.body.contact).toHaveProperty('telephone');
    expect(contact.body.contact).toHaveProperty('createdAt');
    expect(contact.body.contact).toHaveProperty('updatedAt');
    expect(contact.body.contact.fullName).toEqual('Amanda');
    expect(contact.body.contact.email).toEqual('amanda@gmail.com');
    expect(contact.body.contact.telephone).toEqual('5541111111111');

    contactTwoId = contact.body.contact.id
  });

  test('POST /contact - Create contact duplicate email ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactDuplicateEmailMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Já existe um contato com esse email');
  });

  test('POST /contact - Create contact duplicate phone ERROR', async () => {
    const contact = await request(app)
      .post('/contact')
      .send(createContactDuplicatePhoneMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Já existe um contato com esse telefone');
  });

  test('GET /contact - List many contacts', async () => {
    const contact = await request(app)
      .get('/contact')
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(200);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body).toHaveProperty('nextPage');
    expect(contact.body).toHaveProperty('currentPage');
    expect(contact.body).toHaveProperty('previousPage');
    expect(contact.body).toHaveProperty('amountPage');
    expect(contact.body).toHaveProperty('howManyFetched');
    expect(contact.body).toHaveProperty('result');
    expect(contact.body.message).toEqual('Todos os contatos');
    expect(contact.body.nextPage).toEqual(null);
    expect(contact.body.currentPage).toEqual('page=1');
    expect(contact.body.previousPage).toEqual(null);
    expect(contact.body.amountPage).toEqual(1);
    expect(contact.body.howManyFetched).toEqual(2);
    expect(contact.body.result.length).toEqual(2);
  }); 

  test('PATCH /contact - Update contact email already used ERROR', async () => {
    const contact = await request(app)
      .patch(`/contact/${contactOneId}`)
      .send(updateContactEmailAlreadyUsedMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Email já cadastrado');
  });

  test('PATCH /contact - Update contact telephone already used ERROR', async () => {
    const contact = await request(app)
      .patch(`/contact/${contactOneId}`)
      .send(updateContactTelephoneAlreadyUsedMockError)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(400);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Telefone já cadastrado');
  });

  test('PATCH /contact - Update contact found ID ERROR', async () => {
    const contact = await request(app)
      .patch(`/contact/9b474ad4-c6a3-4d17-9372-277655c8214a`)
      .send(updateContactMockSucess)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(404);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Contato não encontrado');
  });

  test('PATCH /contact - Update contact', async () => {
    const contact = await request(app)
      .patch(`/contact/${contactOneId}`)
      .send(updateContactMockSucess)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(200);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Contato atualizado');
    expect(contact.body).toHaveProperty('contact');
    expect(contact.body.contact).toHaveProperty('id');
    expect(contact.body.contact).toHaveProperty('fullName');
    expect(contact.body.contact).toHaveProperty('email');
    expect(contact.body.contact).toHaveProperty('telephone');
    expect(contact.body.contact).toHaveProperty('createdAt');
    expect(contact.body.contact).toHaveProperty('updatedAt');
    expect(contact.body.contact.fullName).toEqual('LucasUpdate');
    expect(contact.body.contact.email).toEqual('lucasUpdate@gmail.com');
    expect(contact.body.contact.telephone).toEqual('554222222222');
  });

  test('DELETE /contact - Delete contact found ID ERROR', async () => {
    const contact = await request(app)
      .delete(`/contact/9b474ad4-c6a3-4d17-9372-277655c8214a`)
      .send(updateContactMockSucess)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(404);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Contato não encontrado');
  });

  test('DELETE /contact - Delete contact', async () => {
    const contact = await request(app)
      .delete(`/contact/${contactTwoId}`)
      .send(updateContactMockSucess)
      .set('Authorization', `Bearer ${token}`);

    expect(contact.status).toBe(200);
    expect(contact.body).toHaveProperty('message');
    expect(contact.body.message).toEqual('Contato removido');
  });
});