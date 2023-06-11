import { Server as HttpServer } from 'http';
import { appConfig, dbConfig } from "../config";
import { closeDbConnection, connectToDb, createExpressApp } from "../lib";
import { IServer } from '../interfaces';

export class Server implements IServer {
  private _server: HttpServer | undefined;

  async start() {
    const app = createExpressApp();
    await connectToDb(dbConfig.uri);
    this._server = app.listen(appConfig.port, () => {
      console.info(`${process.pid} - Server is running @ http://localhost:${appConfig.port}`)
    });
  }

  async close() {
    await closeDbConnection();
    this._server?.close();
  }
}