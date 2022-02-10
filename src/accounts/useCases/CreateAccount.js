import Account from '../entities/Account';

export default {
  createAccount: (firstName, lastName, email, password, accountsRepository) => {
    const account = new Account(null, firstName, lastName, email, password);
    return accountsRepository.persist(account);
  },
  getAccount: (accountId, accountsRepository) => {
    return accountsRepository.get(accountId);
  }
}

