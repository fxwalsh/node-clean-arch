/* eslint-disable no-undef */
import AuthenticationController from "../../../src/accounts/interfaces/AuthenticationController";
import SecurityUseCases from "../../../src/accounts/useCases/Security";
import AccountsSerializer from "../../../src/accounts/interfaces/AccountsSerializer";
import sinon from 'sinon';
import 'should';

describe('Authentication Controller', function () {
    let request;
    let registeredAccount;
    let dependencies;
    let token;
    let verifyRequest;

    beforeEach(() => {
        sinon.restore();
        request = {
            body: { email: 'john.doe@email.com', password: 'tester' }
        }
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        verifyRequest = {
            body: {},
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        dependencies = { accountsSerializer: new AccountsSerializer() }
        registeredAccount = { 'id': 123, 'firstName': 'John', 'lastName': 'Doe', 'email': 'john.doe@email.com' };

    });

    it('should authenticate account', async function () {
        sinon.stub(SecurityUseCases, 'authenticate').returns(token);
        const controller = AuthenticationController(dependencies);
        const result = await controller.getAccessToken(request);
        result.should.equal(token);

    });

    it('should verify account', async function () {
        sinon.stub(SecurityUseCases, 'verify').returns(registeredAccount.email);
        const controller = AuthenticationController(dependencies);
        const result = await controller.verifyAccessToken(verifyRequest);
        result.should.equal(registeredAccount.email);

    });

});
