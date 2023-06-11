import mongoose from 'mongoose';

export const connectToDb = (uri: string) => {
  return mongoose.connect(uri)
    .then(() => console.info('Connected to database'))
    .catch(err => console.error('Failed to connect to database', err))
}

export const closeDbConnection = () => {
  return new Promise((res, rej) => {
    try {
      mongoose.connection.close();
      res(true);
    } catch (err) {
      console.error('Failed to close db connection', err);
      rej(err);
    }
  })
}