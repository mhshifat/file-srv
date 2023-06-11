import 'dotenv/config';
import cluster from 'cluster';
import { cpus } from 'os';
import process from 'process';
import { Server } from './loaders/server';

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Re-fork worker on kill
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  const server = new Server();
  server.start();

  process.on('uncaughtException', () => {
    // Perform any necessary cleanup or logging here
    // Optionally, gracefully shut down the server
    server.close();
  });
  
  // Attach an event listener for unhandled promise rejections
  process.on('unhandledRejection', () => {
    // Perform any necessary error handling or logging here
    server.close();
  });
}
