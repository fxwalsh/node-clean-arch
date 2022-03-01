import Account from '../entities/Account';

export default {
  registerAccount: async  (firstName, lastName, email, password, {accountsRepository, encryptionService}) => {
    const hash = await  encryptionService.encrypt(password)
    const account = new Account(undefined, firstName, lastName, email, hash);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, {accountsRepository}) => {
    return accountsRepository.get(accountId);
  },
  find: ({accountsRepository})=>{
    return accountsRepository.find();
  },
  findByEmail: (email, {accountsRepository})=>{
    return accountsRepository.getByEmail(email);
  },
  updateAccount: (id, firstName, lastName, email, password, {accountsRepository})=>{
    const account = new Account(id, firstName, lastName, email, password);
    return accountsRepository.merge(account);
  }
}

