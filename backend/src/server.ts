import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app: Express = express();
const port: number = 3000;

app.use(cors());

import customerRoutes from './customer';

// Use customer routes
app.use('/customer', customerRoutes);

// Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found');
  res.status(404);
  next(err);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  res.status(res.statusCode || 500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
