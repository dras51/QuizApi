import { should, expect } from 'chai';
import app from '../src/app';
import create from '../src/modules/quiz/controller/actions/create';
import request from 'supertest';
import Quiz, { IQuizProps } from '../src/modules/quiz/model/index';
import mongoose from 'mongoose';

describe('#Sample Test', () => {
  it('Should test that true === true', () => {
    expect(true).to.be.true;
  });
});
describe('#Quiz Routes test', () => {
  beforeEach(async () => {
    await Quiz.deleteMany({});
  });

  describe('#View', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).get('/api/v1/quiz/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).get('/api/v1/quiz/111111111111');
      expect(res.status).to.equal(404);
    });
    it('should return a quiz if valid ID is passed', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const res = await request(app).get(`/api/v1/quiz/${quiz._id}`);
      expect(res.body.data).to.have.property('quiz');
    });
  });
  describe('#list', () => {
    it('should return all quizzes', async () => {
      const quizzes = [
        {
          category: 'Nanny',
          timer: 3,
          description: 'This is a list of questions a nanny should know ',
          title: 'I just formed another title'
        },
        {
          category: 'House Keeping',
          timer: 3,
          description:
            'This is a list of questions a House keeper should know ',
          title: 'I Also formed another title'
        }
      ];
      await Quiz.insertMany(quizzes);
      const res = await request(app).get('/api/v1/quiz/');
      expect(res.status).to.equal(200);
      expect(res.body.data.quizzes.length).to.equal(2);
    });
  });
  describe('#Create', () => {
    it('should ');
  });
});
