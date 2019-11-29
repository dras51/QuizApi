import { expect } from 'chai';
import app from '../src/app';
import request from 'supertest';
import Answer from '../src/modules/answer/model/index';
import AnswerSheet from '../src/modules/answer-sheet/model/index';
import Quiz from '../src/modules/quiz/model/index';
import Question from '../src/modules/question/model/index';

describe('#Sample Test', () => {
  it('Should test that true === true', () => {
    expect(true).to.be.true;
  });
});
describe('#answer Routes test', () => {
  beforeEach(async () => {
    await Answer.deleteMany({});
    await AnswerSheet.deleteMany({});
    await Quiz.deleteMany({});
    await Question.deleteMany({});
  });

  describe('#View', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).get('/api/v1/answer/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).get('/api/v1/answer/111111111111');
      expect(res.status).to.equal(404);
    });
    it('should return a answer if valid ID is passed', async () => {
      const answerSheet = await createAnswerSheet();
      const quiz = await createQuiz();
      const question = await createQuestion(quiz);
      const answer = await createAnswer(answerSheet, question);
      const res = await request(app).get(`/api/v1/answer/${answer._id}`);
      expect(res.body.data).to.have.property('answer');
    });
  });
  describe('#list', () => {
    it('should return all answers', async () => {
      const answerSheet = await createAnswerSheet();
      const quiz = await createQuiz();
      const question = await createQuestion(quiz);
      const answers = [
        {
          userAnswer: 'false',
          answerSheetId: answerSheet._id,
          questionId: question._id
        },
        {
          userAnswer: 'false',
          answerSheetId: answerSheet._id,
          questionId: question._id
        }
      ];
      await Answer.insertMany(answers);
      const res = await request(app).get('/api/v1/answer/');
      expect(res.status).to.equal(200);
      expect(res.body.data.answers.length).to.equal(2);
    });
  });
  describe('#Create', () => {
    it('should return 400 error if the one or more of the input values are wrong', async () => {
      const res = await request(app)
        .post('/api/v1/answer')
        .send({ answerSheetId: 111111111111 });
      expect(res.status).to.equal(400);
    });
    it('should return the newly created answer if no errors', async () => {
      const answerSheet = await createAnswerSheet();
      const quiz = await createQuiz();
      const question = await createQuestion(quiz);
      const answer = {
        userAnswer: 'true',
        answerSheetId: answerSheet._id,
        questionId: question._id
      };
      const res = await request(app)
        .post('/api/v1/answer')
        .send(answer);
      expect(res.body.data).to.have.property('answer');
    });
  });
  describe('#Update', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).patch('/api/v1/answer/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).patch(
        '/api/v1/answer/5ddbeac5e5291824d8b8dfc5'
      );
      expect(res.status).to.equal(404);
    });
    it('should return updated answer if no error was found', async () => {
      const answerSheet = await createAnswerSheet();
      const quiz = await createQuiz();
      const question = await createQuestion(quiz);
      const answer = await createAnswer(answerSheet, question);
      const res = await request(app)
        .patch(`/api/v1/answer/${answer._id}`)
        .send({
          userAnswer: 'false'
        });
      // console.log(res.body);
      expect(res.body.data.updatedAnswer.userAnswer).to.equal('false');
    });
  });
  describe('#Delete', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).del('/api/v1/answer/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).del('/api/v1/answer/111111111111');
      expect(res.status).to.equal(404);
    });
    it('Check if answer is deleted', async () => {
      const answerSheet = await createAnswerSheet();
      const quiz = await createQuiz();
      const question = await createQuestion(quiz);
      const answer = await createAnswer(answerSheet, question);
      const res = await request(app).del(`/api/v1/answer/${answer._id}`);
      const res2 = await request(app).get(`/api/v1/answer/${answer._id}`);
      expect(res.status).to.equal(204);
      expect(res2.status).to.equal(404);
    });
  });
});

async function createAnswer(
  answerSheet: import('mongoose').Document,
  question: import('mongoose').Document
) {
  const answer = await Answer.create({
    userAnswer: 'true',
    answerSheetId: answerSheet._id,
    questionId: question._id
  });
  await answer.save();
  return answer;
}

async function createQuestion(quiz: import('mongoose').Document) {
  const question = await Question.create({
    question: 'This is another',
    questionType: 'true or false',
    rightAnswer: 'David',
    answers: ['Nife', 'David'],
    quizId: quiz._id
  });
  await question.save();
  return question;
}

async function createAnswerSheet() {
  const answerSheet = await AnswerSheet.create({
    userId: '5ddbeac5e5291824d8b8dfc5',
    quizId: '5ddbeac5e5291824d8b8dfc5',
    category: 'House Keeping'
  });
  await answerSheet.save();
  return answerSheet;
}

async function createQuiz() {
  const quiz = await Quiz.create({
    category: 'Nanny',
    timer: 3,
    description: 'This is a list of questions a nanny should know ',
    title: 'I just formed another title'
  });
  await quiz.save();
  return quiz;
}
