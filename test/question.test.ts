import { expect } from 'chai';
import app from '../src/app';
import request from 'supertest';
import Quiz from '../src/modules/quiz/model/index';
import Question from '../src/modules/question/model/index';

describe('#Sample Test', () => {
  it('Should test that true === true', () => {
    expect(true).to.be.true;
  });
});
describe('#question Routes test', () => {
  beforeEach(async () => {
    await Question.deleteMany({});
    await Quiz.deleteMany({});
  });

  describe('#View', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).get('/api/v1/question/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).get('/api/v1/question/111111111111');
      expect(res.status).to.equal(404);
    });
    it('should return a question if valid ID is passed', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const question = await Question.create({
        question: 'This is another test9',
        questionType: 'true or false',
        rightAnswer: 'David',
        answers: ['Nife', 'David'],
        quizId: quiz._id
      });
      await question.save();
      const res = await request(app).get(`/api/v1/question/${question._id}`);
      expect(res.body.data).to.have.property('question');
    });
  });
  describe('#list', () => {
    it('should return all questions', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const questions = [
        {
          question: 'This is another test9',
          questionType: 'true or false',
          rightAnswer: 'David',
          answers: ['Nife', 'David'],
          quizId: quiz._id
        },
        {
          question: 'Who is Jobs girlfriend',
          questionType: 'true or false',
          rightAnswer: 'GoodNews',
          answers: ['Ada', 'GoodNews'],
          quizId: quiz._id
        }
      ];
      await Question.insertMany(questions);
      const res = await request(app).get('/api/v1/question/');
      expect(res.status).to.equal(200);
      expect(res.body.data.questions.length).to.equal(2);
    });
  });
  describe('#Create', () => {
    it('should return 400 error if the one or more of the input values are wrong', async () => {
      const res = await request(app)
        .post('/api/v1/question')
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
      const question = await Question.create({
        question: 'This is another test9',
        questionType: 'true or false',
        rightAnswer: 'David',
        answers: ['Nife', 'David'],
        quizId: quiz._id
      });
      await question.save();
      const res = await request(app)
        .post('/api/v1/question')
        .send({
          question: 'This is another test9',
          questionType: 'true or false',
          rightAnswer: 'David',
          answers: ['Nife', 'David'],
          quizId: quiz._id
        });
      expect(res.status).to.equal(400);
    });
    it('should return the newly created question if no errors', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const question = {
        question: 'This is another test9',
        questionType: 'true or false',
        rightAnswer: 'David',
        answers: ['Nife', 'David'],
        quizId: quiz._id
      };
      const res = await request(app)
        .post('/api/v1/question')
        .send(question);
      expect(res.body.data).to.have.property('newQuestion');
    });
  });
  describe('#Update', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).patch('/api/v1/question/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).patch('/api/v1/question/111111111111');
      expect(res.status).to.equal(404);
      console.log(res.body);
    });
    it('should return updated question if no error was found', async () => {
      const quiz = await Quiz.create({
        category: 'Nanny',
        timer: 3,
        description: 'This is a list of questions a nanny should know ',
        title: 'I just formed another title'
      });
      await quiz.save();
      const question = await Question.create({
        question: 'This is another test9',
        questionType: 'true or false',
        rightAnswer: 'David',
        answers: ['Nife', 'David'],
        quizId: quiz._id
      });
      await question.save();
      const res = await request(app)
        .patch(`/api/v1/question/${question._id}`)
        .send({
          rightAnswer: 'Nife'
        });
      // console.log(res.body);
      expect(res.body.data.question.rightAnswer).to.equal('Nife');
    });
  });
  describe('#Delete', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).del('/api/v1/question/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).del('/api/v1/question/111111111111');
      expect(res.status).to.equal(404);
    });
    it('Check if question is deleted', async () => {
      const question = await Question.create({
        question: 'This is another test9',
        questionType: 'true or false',
        rightAnswer: 'David',
        answers: ['Nife', 'David'],
        quizId: '5ddbeac5e5291824d8b8dfc5'
      });
      await question.save();
      const res = await request(app).del(`/api/v1/question/${question._id}`);
      const res2 = await request(app).get(`/api/v1/question/${question._id}`);
      expect(res.status).to.equal(204);
      expect(res2.status).to.equal(404);
    });
  });
});
