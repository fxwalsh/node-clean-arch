import Account from '../../../entities/Account'
import AccountRepository from '../../../entities/Repository'

export default class extends AccountRepository {

  dataAsArray() {
    return Object.keys(this.data).map(key => this.data[key]);
  }

  constructor() {
    super();
    this.index = 1;
    this.data = {};
  }

  async persist(userEntity) {
    const row = Object.assign({}, userEntity);
    const rowId = this.index++;
    row.id = rowId;
    this.data[rowId] = row;
    return row;
  }

  merge(userEntity) {
    let row = this.data[userEntity.id];
    Object.assign(row, userEntity);
    return Promise.resolve(row);
  }

  remove(userId) {
    delete this.data[userId];
    return Promise.resolve();
  }

  get(userId) {
    return Promise.resolve(this.data[userId]);
  }

  getByEmail(userEmail) {
    const users = this._dataAsArray();
    return Promise.resolve(users.find(user => user.email === userEmail));
  }

  find() {
    return Promise.resolve(this._dataAsArray());
  }

};
