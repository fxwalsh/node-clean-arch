
import EncryptionService from '../../entities/Encryption'
import bcrypt from 'bcryptjs';

export default class extends EncryptionService {

  async encrypt(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async compare(password, encryptedPassword) {
    try {
      // Compare password
      return await bcrypt.compare(password, encryptedPassword);
    } catch (error) {
      return error;
    }


  }
}