import Question from "questionModule/model/index";
import ApiFeatures from "util/api-features";
import express from "express";

const listQuestion = async (req: express.Request, res: express.Response) => {
  try {
    const features = new ApiFeatures(Question.find(), req.query)
      .filter()
      .sort()
      .LimitFields()
      .pagination();

    const questions = await features.query;
    res.status(200).json({
      status: "success",
      results: questions.length,
      data: {
        questions
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};

export default listQuestion;
