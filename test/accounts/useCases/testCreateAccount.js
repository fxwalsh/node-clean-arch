import Account  from '../../../src/accounts/entities/Account';
import AccountRepository from '../../../src/accounts/entities/Repository'; 
import AccountUseCases from '../../../src/accounts/useCases/CreateAccount';
import sinon from 'sinon';
import 'should';

describe('Create Account Use Case', function() {
    let mockUserRepository;
    let persistedAccount;

    beforeEach(() => {
        sinon.restore();
        mockUserRepository = new AccountRepository();
        persistedAccount = new Account(123, 'John', 'Doe', 'john.doe@email.com', 'tester');
      });

    it('should resolve with the newly persisted account (augmented with an ID)', async function() {
      const persist = sinon.stub( mockUserRepository, 'persist').resolves(persistedAccount);
      const account = await AccountUseCases.createAccount('John', 'Doe', 'john.doe@email.com', 'tester', mockUserRepository );
      account.should.equal(persistedAccount);
      sinon.assert.calledWith(persist, new Account(null, 'John', 'Doe', 'john.doe@email.com', 'tester'));
    });
  });