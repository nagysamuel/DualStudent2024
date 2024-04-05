import express, { Express, Request, Response } from 'express';
import cors from 'cors';
const app: Express = express();
const port: number = 3000;

app.use(cors());

import customerRoutes from './customer';

app.use('/customer', customerRoutes);

app.get('/test', (req: Request, res: Response) => {
  res.send('Test');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
