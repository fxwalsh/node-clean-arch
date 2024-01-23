import dotenv from 'dotenv';
import mongoose from 'mongoose';
import sequelize from './../repositories/sql/sequelize';

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
     const db = sequelize.connect(process.env.DATABASE_URL)
     // const sequelize = new Sequelize("","root","ilikecake",{host:"localhost", dialect: "mysql"} );
      try {
        //const connection = await mysql.createConnection({
        //  host: "localhost",
       //   user: "root",
       //   password: "ilikecake"
       // });
      await db.sync();
       // let DBName = "movies_db"
       // await sequelize.query("CREATE DATABASE IF NOT EXISTS `"+DBName+"`;")
     //  db.query("CREATE TRIGGER add_uuid BEFORE INSERT ON accounts FOR EACH ROW SET new.id = uuid();")
        console.log('Connection to DB has been established successfully.');
      } catch (err) {
        console.error('Unable to connect to the database:', err);
      }
    }
  }
};
