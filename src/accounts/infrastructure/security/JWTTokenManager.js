'use strict';

import jwt from 'jsonwebtoken';

import SecurityContract  from '../../SecurityToken';
 
const JWT_SECRET_KEY = 'ilikecake';

export default  class extends SecurityContract {

  generate(payload) {
    return jwt.sign(payload, JWT_SECRET_KEY);
  }

  decode(accessToken) {
    return jwt.verify(accessToken, JWT_SECRET_KEY);
  }
}