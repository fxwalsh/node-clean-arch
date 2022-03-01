/* eslint-disable no-undef */
import AccountsController from "../../../src/accounts/interfaces/AccountsController";
import AccountUseCases from "../../../src/accounts/useCases/Account";
import AccountsSerializer from "../../../src/accounts/interfaces/AccountsSerializer";
import sinon from 'sinon';
import 'should';
import { mockRequest, mockResponse } from 'mock-req-res'

describe('Create Account Controller', function () {
    let request;
    let response;
    let dependencies;

    beforeEach(() => {
        sinon.restore();
        request = mockRequest({
            body: { firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester' }
        })
        response = mockResponse();
        dependencies = { accountsSerializer: new AccountsSerializer() }
    });

    it('should resolve with the newly persisted account (augmented with an ID)', async function () {
        sinon.stub(AccountUseCases, 'registerAccount').returns({ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester', id: 123 });
        const controller = AccountsController(dependencies);
        await controller.createAccount(request, response);
        response.json.called
        response.status.calledWith(201);

    });

    it('should find all accounts', async function () {
        sinon.stub(AccountUseCases, 'find').returns([{ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester', id: 123 }, { firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@email.com', password: 'tester', id: 456 }]);
        const controller = AccountsController(dependencies);
        await controller.find(request, response);
        response.json.called;
        response.status.calledWith(200);
    })

    it('should update an existing persisted account', async function () {
        sinon.stub(AccountUseCases, 'updateAccount').returns({ firstName: 'John', lastName: 'Doe', email: 'john.doe@email.com', password: 'tester', id: 123 });
        const controller = AccountsController(dependencies);
        await controller.updateAccount(request, response);
        response.json.called;
        response.status.calledWith(200);

    })
})