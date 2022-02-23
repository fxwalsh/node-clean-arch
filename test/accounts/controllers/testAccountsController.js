/* eslint-disable no-undef */
import AccountsController from "../../../src/accounts/interfaces/AccountsController";
import AccountUseCases from "../../../src/accounts/useCases/Account";
import AccountsSerializer from "../../../src/accounts/interfaces/AccountsSerializer";
import sinon from 'sinon';
import 'should';

describe('Create Account Controller', function () {
    let request;
    let registeredAccount;
    let dependencies;
   
    beforeEach(() => {
        sinon.restore();
        request = {
            body: { firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester' }
        }
        dependencies = { accountsSerializer: new AccountsSerializer() }
        registeredAccount = { 'id': 123, 'firstName': 'John', 'lastName': 'Doe', 'email': 'john.doe@email.com' };
      
    });

    it('should resolve with the newly persisted account (augmented with an ID)', async function () {
        sinon.stub(AccountUseCases, 'registerAccount').returns({ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester', id: 123 });
        const controller = AccountsController(dependencies);
        const account = await controller.registerAccount(request);
        account.id.should.equal(registeredAccount.id);
        account['firstName'].should.equal(registeredAccount['firstName']);
        //sinon.assert.calledWith(persist, new Account(null, 'John', 'Doe', 'john.doe@email.com', 'tester'));
    });

    it('should find all accounts', async function () {
        sinon.stub(AccountUseCases, 'find').returns([{ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester', id: 123 }, { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@email.com', password: 'tester', id: 456 }]);
        const controller = AccountsController(dependencies);
        const accounts = await controller.find();
        accounts.length.should.equal(2);
        accounts[0]['firstName'].should.equal(registeredAccount['firstName']);
    });

    it('should update an existing persisted account', async function () {
        sinon.stub(AccountUseCases, 'updateAccount').returns({ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester', id: 123 });
        const controller = AccountsController(dependencies);
        const account = await controller.updateAccount(request);
        account.id.should.equal(registeredAccount.id);
        account['firstName'].should.equal(registeredAccount['firstName']);
        //sinon.assert.calledWith(persist, new Account(null, 'John', 'Doe', 'john.doe@email.com', 'tester'));
    });
});
