import express from 'express';
import Mongoose, { CastError } from 'mongoose';
import { MongoError } from 'mongodb';
import { StackData } from 'stack-utils';
import AppError from './app-error';

const handleCastErrorDB = (err: Mongoose.CastError) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoError) => {
  function extractFirstText(str: string) {
    const matches = str.match(/"(.*?)"/);
    return matches ? matches[1] : str;
  }
  const value = extractFirstText(err.errmsg);
  const message = `Duplicate field Value: ${value}. please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid Input data.${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err: AppError, res: express.Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
};

const sendErrorProd = (err: AppError, res: express.Response) => {
  // Operational Error: send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });

    // Programming, Unknown Error: Dont send to the client
  } else {
    //1. Log Error
    console.log('Error❌', err);

    //Send Generic Message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong'
    });
  }
};

export interface IError extends ErrorConstructor {
  statusCode: number;
  status: string;
  message: string;
  stack: StackData;
  name: string;
  code: number;
}
export default (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production' || 'test') {
    let error: any = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
};
