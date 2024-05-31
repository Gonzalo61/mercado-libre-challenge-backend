import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import errorMiddleware from './middleware/error.middleware';
import routes from './routes/product.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: '*',
    methods: ['GET'],
  })
);
app.get('/', (_req: Request, res: Response) => res.send('Backend is running successfully!'));
app.use('/api', routes);
app.use(errorMiddleware);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);

export default app;
