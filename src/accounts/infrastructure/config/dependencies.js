import constants from './constants';
//import  environment from './environment';
// const JwtAccessTokenManager = require('../security/JwtAccessTokenManager');
import AccountsSerializer from '../../interfaces/AccountsSerializer';
import AccountsRepositoryInMemory from '../repositories/in-memory/AccountsRepositoryInMemory';
import AccountsRepositoryMongo from '../repositories/mongo/AccountsRepositoryMongo';

const buildDependencies = () => {
  console.log("dep:" + process.env.DATABASE_DIALECT)
  const dependencies = {
    // accessTokenManager: new JwtAccessTokenManager(),
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
    beans.userRepository = new UserRepositorySQLite();
  }

  return dependencies;
}

export default buildDependencies;
