import cors from 'cors';
import express from 'express';
import { Routes } from '../routes';

export const createExpressApp = () => {
  const app = express();

  app.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: false })
  ]);

  Routes.registerRoutes(app);

  return app;
}