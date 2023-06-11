export interface IServer {
  start(): Promise<void>;
  close(): Promise<void>;
}