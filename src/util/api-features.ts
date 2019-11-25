import express from 'express';

interface IQueryString extends express.Request {
  sort?: string;
  limit?: number;
  fields?: string;
  page?: number;
}

export default class ApiFeatures {
  query: any;
  queryString: IQueryString;
  constructor(query: any, queryString: IQueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj: Record<string, any> = { ...this.queryString };
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    this.query.find(queryObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  LimitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
