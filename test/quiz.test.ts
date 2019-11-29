import { should, expect } from 'chai';
import app from '../src/app';
import request from 'supertest';
import Quiz from '../src/modules/quiz/model/index';

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
    it('should return 400 error if the one or more of the input values are wrong', async () => {
      const res = await request(app)
        .post('/api/v1/quiz')
        .send({
          category: 'House Keeping',
          timer: 3,
          description: 'This is a list of questions a House keeper should know '
        });
      expect(res.status).to.equal(400);
    });
    it('should return 400 error if duplicate data is used', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const res = await request(app)
        .post('/api/v1/quiz')
        .send({
          category: 'House Keeping',
          timer: 3,
          description:
            'This is a list of questions a House keeper should know ',
          title: 'I just formed another title'
        });
      expect(res.status).to.equal(400);
    });
    it('should return the newly created quiz if no errors', async () => {
      const quiz = {
        category: 'House Keeping',
        timer: 3,
        description: 'This is a list of questions a House keeper should know ',
        title: 'I just formed another title'
      };
      const res = await request(app)
        .post('/api/v1/quiz')
        .send(quiz);
      expect(res.body.data.newQuiz).to.have.property('title', quiz.title);
    });
  });
  describe('#Update', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).patch('/api/v1/quiz/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).patch('/api/v1/quiz/111111111111');
      expect(res.status).to.equal(404);
    });
    it('should return updated quiz if no error was found', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const res = await request(app)
        .patch(`/api/v1/quiz/${quiz._id}`)
        .send({
          category: 'House Keeping',
          timer: 3,
          description:
            'This is a list of questions a House keeper should know ',
          title: 'I just formed another title'
        });
      // console.log(res.body);
      expect(res.body.data.quiz.category).to.equal('House Keeping');
    });
  });
  describe('#Delete', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).del('/api/v1/quiz/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).del('/api/v1/quiz/111111111111');
      expect(res.status).to.equal(404);
    });
    it('Check if quiz is deleted', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const res = await request(app).del(`/api/v1/quiz/${quiz._id}`);
      const res2 = await request(app).get(`/api/v1/quiz/${quiz._id}`);
      expect(res.status).to.equal(204);
      expect(res2.status).to.equal(404);
    });
  });
});
