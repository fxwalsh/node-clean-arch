import constants from './constants';
//import  environment from './environment';
import JWTTokenManager from '../security/JWTTokenManager';
import AccountsSerializer from '../../interfaces/AccountsSerializer';
import AccountsRepositoryInMemory from '../repositories/in-memory/AccountsRepositoryInMemory';
import AccountsRepositoryMongo from '../repositories/mongo/AccountsRepositoryMongo';

const buildDependencies = () => {
  const dependencies = {
    accessTokenManager: new JWTTokenManager(),
    accountsSerializer: new AccountsSerializer(),
  };

  if (process.env.DATABASE_DIALECT === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    dependencies.accountsRepository = new AccountsRepositoryInMemory();
  } else if (process.env.DATABASE_DIALECT === constants.SUPPORTED_DATABASE.MONGO) {

    dependencies.accountsRepository = new AccountsRepositoryMongo();
  } else if (process.env.DATABASE_DIALECT === constants.SUPPORTED_DATABASE.POSTGRES) {
    throw new Error('Add PostgreSQL support');
  } else {
    const UserRepositorySQLite = require('../repositories/UserRepositorySQLite');
    dependencies.accountsRepository = new UserRepositorySQLite();
  }

  return dependencies;
}

export default buildDependencies;
