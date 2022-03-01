import BCryptService from '../../src/accounts/infrastructure/security/BCryptService'
import 'should';

describe('BCrypt Encryption', function () {
  
   let encryptionService
    beforeEach(() => {
        encryptionService=new BCryptService()

    });

    it('should encrypt a password', async function () {
       const hash = await encryptionService.encrypt("password")
       hash.should.exist
      
    });

    it('should compare passwords and return true', async function () {
        const result = await encryptionService.compare("password","$2a$10$3HHa35XyU0VJqNugeKvEZumc8ftXtf8Ya9I8Fh1IenABbDPa2wVfK")
        result.should.be.true
        
     });

     it('should compare passwords and return false', async function () {
      const result = await encryptionService.compare("password","$2a$10$3HH35XyU0VJqNugeKvEZumc8ftXtf8Ya9I8Fh1IenABbDPa2wVfK")
      result.should.be.false
     
   });

  
}
)