import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Sequelize from 'sequelize';

dotenv.config();

import constants from './constants';

export default {

  async init() {

    if (process.env.DATABASE_DIALECT === constants.SUPPORTED_DATABASE.MONGO) {
      // Connect to database
      mongoose.connect(process.env.DATABASE_URL);
      const db = mongoose.connection;

      db.on('error', (err) => {
        console.log(`database connection error: ${err}`);
      });
      db.on('disconnected', () => {
        console.log('database disconnected');
      });
      db.once('open', () => {
        console.log(`database connected to ${db.name} on ${db.host}`);
      });
    }
    if (process.env.DATABASE_DIALECT === constants.SUPPORTED_DATABASE.MYSQL) {
      const sequelize = new Sequelize(process.env.DATABASE_URL);
      try {
        await sequelize.sync();
        console.log('Connection to DB has been established successfully.');
      } catch (err) {
        console.error('Unable to connect to the database:', err);
      }
    }
  }
};
