const serializeSingleUser = (account) => {
  return account;
};

export default class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
     return data.map(_serializeSingleUser);
    }
    return serializeSingleUser(data);
  }

};