import { expect } from 'chai';
import app from '../src/app';
import request from 'supertest';
import Answer from '../src/modules/answer/model/index';
import AnswerSheet from '../src/modules/answer-sheet/model/index';

describe('#Sample Test', () => {
  it('Should test that true === true', () => {
    expect(true).to.be.true;
  });
});

describe('#Answer Sheet Route test', () => {
  beforeEach(async () => {
    await Answer.deleteMany({});
    await AnswerSheet.deleteMany({});
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
      const answerSheet = await AnswerSheet.create({
        userId: '5ddbeac5e5291824d8b8dfc5',
        quizId: '5ddbeac5e5291824d8b8dfc5',
        category: 'Nanny'
      });
      await answerSheet.save();
      const res = await request(app).get(
        `/api/v1/answer-sheet/${answerSheet._id}`
      );
      expect(res.body.data).to.have.property('answerSheet');
    });
  });
  describe('#list', () => {
    it('should return all the Answer Sheets', async () => {
      const answerSheets = [
        {
          userId: '5ddbeac5e5291824d8b8dfc5',
          quizId: '5ddbeac5e5291824d8b8dfc5',
          category: 'Nanny'
        },
        {
          userId: '5ddbeac5e5291824d8b8dfc5',
          quizId: '5ddbeac5e5291824d8b8dfc5',
          category: 'House Keeping'
        }
      ];
      await AnswerSheet.insertMany(answerSheets);
      const res = await request(app).get('/api/v1/answer-sheet');
      expect(res.status).to.equal(200);
      expect(res.body.data.answerSheets.length).to.equal(2);
    });
  });
  describe('#Create', () => {
    it('should return 400 error if the one or more input values are wrong', async () => {
      const res = await request(app)
        .post('/api/v1/answer-sheet')
        .send({
          userId: '5ddbeac5e5291824d8b8dfc5',
          category: 'Nanny'
        });
      expect(res.status).to.equal(400);
    });
    // it('should return 400 error if duplicate data is used', async () => {
    //   const answerSheet = await AnswerSheet.create({
    //     userId: '5ddbeac5e5291824d8b8dfc5',
    //     quizId: '5ddbeac5e5291824d8b8dfc5',
    //     category: 'House Keeping'
    //   });
    //   await answerSheet.save();
    //   const res = await request(app)
    //     .post('/api/v1/answer-sheet')
    //     .send({
    //       userId: '5ddbeac5e5291824d8b8dfc5',
    //       quizId: '5ddbeac5e5291824d8b8dfc5',
    //       category: 'House Keeping'
    //     });
    //   expect(res.status).to.equal(400);
    // });
    it('should return the newly created answer-sheet if no errors', async () => {
      const answerSheet = {
        userId: '5ddbeac5e5291824d8b8dfc5',
        quizId: '5ddbeac5e5291824d8b8dfc5',
        category: 'House Keeping'
      };
      const res = await request(app)
        .post('/api/v1/answer-sheet')
        .send(answerSheet);
      expect(res.body.data).to.have.property('answerSheet');
    });
  });
  describe('#Update', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).patch('/api/v1/answer-sheet/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).patch('/api/v1/answer-sheet/111111111111');
      expect(res.status).to.equal(404);
    });
    it('should return updated answer-sheet if no error was found', async () => {
      const answerSheet = await AnswerSheet.create({
        userId: '5ddbeac5e5291824d8b8dfc5',
        quizId: '5ddbeac5e5291824d8b8dfc5',
        category: 'House Keeping'
      });
      await answerSheet.save();
      const res = await request(app)
        .patch(`/api/v1/answer-sheet/${answerSheet._id}`)
        .send({
          category: 'Nanny'
        });
      expect(res.body.data).to.have.property('answerSheet');
    });
  });
  describe('#Delete', () => {
    it('Return 400 error if an invalid ID passed', async () => {
      const res = await request(app).patch('/api/v1/answer-sheet/1');
      expect(res.status).to.equal(400);
    });
    it('Should return 404 error if Document does not exist', async () => {
      const res = await request(app).patch('/api/v1/answer-sheet/111111111111');
      expect(res.status).to.equal(404);
    });
    it('should check if the answer-sheet has been deleted', async () => {
      const answerSheet = await AnswerSheet.create({
        userId: '5ddbeac5e5291824d8b8dfc5',
        quizId: '5ddbeac5e5291824d8b8dfc5',
        category: 'House Keeping'
      });
      await answerSheet.save();
      const res = await request(app).del(
        `/api/v1/answer-sheet/${answerSheet._id}`
      );
      // const res2 = await request(app).get(
      //   `/api/v1/answer-sheet/${answerSheet._id}`
      // );
      expect(res.status).to.equal(204);
      // expect(res2.status).to.equal(404);
    });
  });
});
