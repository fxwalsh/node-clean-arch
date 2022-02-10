import AccountsController from "../../../src/accounts/interfaces/AccountsController";
import AccountUseCases from "../../../src/accounts/useCases/CreateAccount";
import AccountsSerializer from "../../../src/accounts/interfaces/AccountsSerializer";
import sinon from 'sinon';
import 'should';

describe('Create Account Controller', function () {
    let request;
    let persistedAccount;
    let dependencies;
    beforeEach(() => {
        sinon.restore();
        request = {
            body: { firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester' }
        }
        dependencies= { accountsSerializer: new AccountsSerializer()}
        persistedAccount = {'id': 123, 'first-name': 'John', 'last-name': 'Doe', 'email': 'john.doe@email.com'};
    });

    it('should resolve with the newly persisted account (augmented with an ID)', async function () {
        sinon.stub(AccountUseCases,'createAccount').returns({firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester',id:123});
        const controller = AccountsController(dependencies);
        const account = await controller.createAccount(request);
        account.id.should.equal(persistedAccount.id);
        account['first-name'].should.equal(persistedAccount['first-name']);
        //sinon.assert.calledWith(persist, new Account(null, 'John', 'Doe', 'john.doe@email.com', 'tester'));
    });
});
