import { AxiosError } from 'axios';
import { Request, Response } from 'express';

const errorMiddleware = (
  error: AxiosError,
  _request: Request,
  response: Response
) => {
  const status = error.response?.status || 500;
  const message = error.message || 'Something went wrong';

  response.status(status).send({
    status,
    message,
  });
};

export default errorMiddleware;
