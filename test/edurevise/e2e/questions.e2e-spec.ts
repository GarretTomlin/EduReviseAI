import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { QuestionFactory } from '../../../src/database/factory/question.factory';
import { EntityManager } from '@mikro-orm/core';
import { Question } from '../../../src/database/entities/edurevise/question.entity';
import { beforeAll, afterAll, describe, it, expect } from 'bun:test';

describe('QuestionController (e2e)', () => {
  let app: INestApplication;
  let questionFactory: QuestionFactory;
  let entityManager: EntityManager;
  let createdQuestion: Question;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    entityManager = moduleFixture.get(EntityManager);
    const forkedEntityManager = entityManager.fork();

    questionFactory = new QuestionFactory(forkedEntityManager);
    app = moduleFixture.createNestApplication();
    await app.init();
    createdQuestion = await questionFactory.createOne();
  });

  it('should create a question and fetch it', async () => {
    const create = await request(app.getHttpServer())
      .post('/questions')
      .send({
        message: createdQuestion.message,
        authorId: createdQuestion.author.id,
        questionBankId: createdQuestion.questionBank.id,
      })
      .expect(201);

    const fetch = await request(app.getHttpServer()).get(
      `/questions/${createdQuestion.id}`,
    );

    expect(create.status).toBe(201);
    expect(fetch.status).toBe(200);
    expect(fetch.body.message).toBe(createdQuestion.message);
  });

  it('it should update the created question ', async () => {
    const newQuestion = questionFactory.makeOne();

    const update = await request(app.getHttpServer())
      .patch(`/questions/${createdQuestion.id}`)
      .send({
        message: newQuestion.message,
      });
    expect(update.status).toBe(200);
  });

  it('it should fetch all questions', async () => {
    const fetch = await request(app.getHttpServer()).get('/questions/all');
    expect(fetch.status).toBe(200);
  });

  it('it should delete the created question', async () => {
    const remove = await request(app.getHttpServer()).delete(
      `/questions/${createdQuestion.id}`,
    );
    expect(remove.status).toBe(200);
  });
  afterAll(async () => {
    await entityManager.nativeDelete(Question, { id: createdQuestion.id });
    await app.close();
  });
});
