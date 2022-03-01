import Account from '../../../src/accounts/entities/Account';
import AccountRepository from '../../../src/accounts/entities/Repository';
import EncryptionService from '../../../src/accounts/entities/Encryption';
import AccountUseCases from '../../../src/accounts/useCases/Account';
import sinon from 'sinon';
import 'should';

describe('Create Account Use Case', function () {

  let persistedAccount;
  let persistedAccounts;
  let services;
  let encryptedPassword;
  let password;

  beforeEach(() => {
    sinon.restore();
    services = {
      accountsRepository: new AccountRepository(),
      encryptionService: new EncryptionService()
    }
    encryptedPassword = 'goobledegook';
    password = 'tester';
    persistedAccount = new Account('123', 'John', 'Doe', 'john.doe@email.com');
    persistedAccounts = [new Account('123', 'John', 'Doe', 'john.doe@email.com', 'tester'), new Account('456', 'Jane', 'Doe', 'jane.doe@email.com', 'tester')];
  });

  it('should resolve with the newly persisted account (augmented with an ID)', async function () {
    const persist = sinon.stub(services.accountsRepository, 'persist').resolves(persistedAccount);
    sinon.stub(services.encryptionService, 'encrypt').returns(encryptedPassword);
    const account = await AccountUseCases.registerAccount('John', 'Doe', 'john.doe@email.com', password, services);
    account.should.equal(persistedAccount);
    sinon.assert.calledWith(persist, new Account(undefined, 'John', 'Doe', 'john.doe@email.com', encryptedPassword));
  });

  it('should find all accountns', async function () {
    sinon.stub(services.accountsRepository, 'find').resolves(persistedAccounts);
    const accounts = await AccountUseCases.find(services);
    accounts.length.should.equal(2);
  });

  it('should update an account details', async function () {
    const merge = sinon.stub(services.accountsRepository, 'merge').resolves(persistedAccount);
    sinon.stub(services.encryptionService, 'encrypt').returns(encryptedPassword);
    const account = await AccountUseCases.updateAccount('123', 'John', 'Doe', 'john.doe@email.com', 'tester', services);
    account.should.equal(persistedAccount);
    sinon.assert.calledWith(merge, new Account(persistedAccount.id, 'John', 'Doe', 'john.doe@email.com', 'tester'));
  });
});