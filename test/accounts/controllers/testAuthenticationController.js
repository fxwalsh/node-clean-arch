/* eslint-disable no-undef */
import AuthenticationController from "../../../src/accounts/controllers/AuthenticationController";
import SecurityUseCases from "../../../src/accounts/useCases/Security";
import AccountsSerializer from "../../../src/accounts/controllers/AccountsSerializer";
import sinon from 'sinon';
import 'should';
import { mockRequest, mockResponse } from 'mock-req-res'

describe('Authentication Controller', function () {
    let request;
    let response;
    let registeredAccount;
    let dependencies;
    let token;
    let verifyRequest;

    beforeEach(() => {
        sinon.restore();
        request = mockRequest({
            body: { email: 'john.doe@email.com', password: 'tester' }
        })
        response = mockResponse();
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
        controller.getAccessToken(request,response);
        response.status.calledWith(201);
        response.json.calledWith({token: token});

    });

    it('should verify account', async function () {
        sinon.stub(SecurityUseCases, 'verify').returns(registeredAccount.email);
        const controller = AuthenticationController(dependencies);
        await controller.verifyAccessToken(verifyRequest, response,()=>{} );
    });

});
