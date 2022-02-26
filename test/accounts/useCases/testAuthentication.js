import Account from '../../../src/accounts/entities/Account';
import AccountRepository from '../../../src/accounts/entities/Repository';
import SecurityUseCases from '../../../src/accounts/useCases/Security';
import SecurityContract from '../../../src/accounts/useCases/SecurityContract';
import EncryptionService from '../../../src/accounts/entities/Encryption'; 
import sinon from 'sinon';
import 'should';
import should from 'should';

describe('Authenticate Account Use Case', function () {
    let mockUserRepository;
    let persistedAccount;
    let mockEncryptionService;
    let mockTokenManager;
    let token;
    let encryptedPassword;

    beforeEach(() => {
        sinon.restore();
        mockUserRepository = new AccountRepository();
        mockTokenManager = new SecurityContract();
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
        encryptedPassword = 'goobledegook'
        persistedAccount = new Account('123', 'John', 'Doe', 'john.doe@email.com', 'tester');
     //   persistedAccounts = [new Account(123, 'John', 'Doe', 'john.doe@email.com', 'tester'), new Account(456, 'Jane', 'Doe', 'jane.doe@email.com', 'tester')];
     mockEncryptionService = new EncryptionService();
    });

    it('should return a token', async function () {
        const findByEmail = sinon.stub(mockUserRepository, 'getByEmail').resolves(persistedAccount);
        sinon.stub(mockTokenManager, 'generate').resolves(token);
        sinon.stub(mockEncryptionService, 'compare').returns(true);
        const result = await SecurityUseCases.authenticate(persistedAccount.email, persistedAccount.password,  mockUserRepository,  mockTokenManager, mockEncryptionService);
        result.should.equal(token);
        sinon.assert.calledWith(findByEmail, 'john.doe@email.com');
    });

    it('should reject authentication', async function () {
        sinon.stub(mockUserRepository, 'getByEmail').resolves(persistedAccount);
        sinon.stub(mockTokenManager, 'generate').resolves(token);
        sinon.stub(mockEncryptionService, 'compare').returns(false);
        try{
          await SecurityUseCases.authenticate(persistedAccount.email, persistedAccount.password,  mockUserRepository,  mockTokenManager, mockEncryptionService)
        }catch(error){
            error.exist;
        }
    });


    it('should verify a token', async function () {
        sinon.stub(mockUserRepository, 'getByEmail').resolves(persistedAccount);
        const decode = sinon.stub(mockTokenManager, 'decode').resolves(persistedAccount.email);
        const result = await SecurityUseCases.verify(token, mockUserRepository,mockTokenManager );
        result.should.equal(persistedAccount.email);
        sinon.assert.calledWith(decode,  token);
    });

});