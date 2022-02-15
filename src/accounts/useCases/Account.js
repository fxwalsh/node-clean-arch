import Account from '../entities/Account';

export default {
  registerAccount: (firstName, lastName, email, password, accountsRepository) => {
    const account = new Account(null, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, accountsRepository) => {
    return accountsRepository.get(accountId);
  },
  find: (accountsRepository)=>{
    return accountsRepository.find();
  },
  findByEmail: (email, accountsRepository)=>{
    return accountsRepository,getByEmail(email);
  },
  updateAccount: (firstName, lastName, email, password, accountsRepository)=>{
    const account = new Account(null, firstName, lastName, email, password);
    return accountsRepository.merge(account);
  }
}
