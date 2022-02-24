import Account  from '../../../src/accounts/entities/Account';
import AccountRepository from '../../../src/accounts/entities/Repository'; 
import AccountUseCases from '../../../src/accounts/useCases/Account';
import sinon from 'sinon';
import 'should';

describe('Create Account Use Case', function() {
    let mockUserRepository;
    let persistedAccount;
    let persistedAccounts;

    beforeEach(() => {
        sinon.restore();
        mockUserRepository = new AccountRepository();
        persistedAccount = new Account(123, 'John', 'Doe', 'john.doe@email.com', 'tester');
        persistedAccounts = [new Account(123, 'John', 'Doe', 'john.doe@email.com', 'tester'),new Account(456, 'Jane', 'Doe', 'jane.doe@email.com', 'tester')];
      });

    it('should resolve with the newly persisted account (augmented with an ID)', async function() {
      const persist = sinon.stub( mockUserRepository, 'persist').resolves(persistedAccount);
      const account = await AccountUseCases.registerAccount('John', 'Doe', 'john.doe@email.com', 'tester', mockUserRepository );
      account.should.equal(persistedAccount);
      sinon.assert.calledWith(persist, new Account(undefined, 'John', 'Doe', 'john.doe@email.com', 'tester'));
    });

    it('should find all accountns', async function() {
      const find = sinon.stub( mockUserRepository, 'find').resolves(persistedAccounts);
      const accounts = await AccountUseCases.find( mockUserRepository );
      accounts.length.should.equal(2);
    });

    it('should update an account details', async function() {
      const merge = sinon.stub( mockUserRepository, 'merge').resolves(persistedAccount);
      const account = await AccountUseCases.updateAccount('John', 'Doe', 'john.doe@email.com', 'tester', mockUserRepository );
      account.should.equal(persistedAccount);
      sinon.assert.calledWith(merge, new Account(null, 'John', 'Doe', 'john.doe@email.com', 'tester'));
    });
  });