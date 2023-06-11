const { DB_URI } = process.env;

export const dbConfig = {
  uri: DB_URI || ''
}