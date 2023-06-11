import { Application } from "express";
import { appConfig } from "../config";
import { errorHandler, notFoundHandler, requestLogger } from "./middlewares";
import { FileRouter } from "./modules/v1/files";

export class Routes {
  static registerRoutes(app: Application) {
    app.use([
      requestLogger,
    ]);

    app.get('/', (_, res, next) => res.json({
      version: appConfig.version,
      name: appConfig.name, 
      description: appConfig.description,
    }));
    app.use('/api/v1/files', FileRouter);
    app.get('/status', (_, res) => res.sendStatus(200));
    app.get('*', notFoundHandler);
    app.use(errorHandler);
  }
}