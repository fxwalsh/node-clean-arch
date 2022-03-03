import Sequelize from 'sequelize'
import Account from '../../../entities/Account'
import AccountRepository from '../../../entities/Repository'

module.exports = class extends AccountRepository {

  constructor() {
    super();
    // Constucts ORM in contstuctor. Probably would be better in separate module to be honest!
    try{
    const db = new Sequelize("movies_db", "root", "ilikecake", { host: "localhost", dialect: "mysql" });

    db.define('account', {
      // Name of Column #1 and its properties defined: id
      id: {
        // Integer Datatype
        type: Sequelize.UUID,
        // To uniquely identify user
        primaryKey: true
      },
      // Name of Column #2: name
      firstName: { type: Sequelize.STRING, allowNull: false },
      // Name of Column #3: name
      lastName: { type: Sequelize.STRING, allowNull: false },

      // Name of Column #3: email
      email: { type: Sequelize.STRING, allowNull: false },

      // Name of Column #3: email
      password: { type: Sequelize.STRING, allowNull: false },
    })
    db.query("CREATE TRIGGER before_insert_movie BEFORE INSERT ON accounts FOR EACH ROW SET new.id = uuid();")
    this.model = db.model('account');
    db.sync()
  }catch(error){
    console.log("ERROR"+error)
  }
  }

  async persist(userEntity) {
    const { firstName, lastName, email, password } = userEntity;
    console.log(firstName)
    const seqUser = await this.model.create({ firstName, lastName, email, password });
    const result = await seqUser.save();
    console.log(result)
    return new Account(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
  }

  async merge(userEntity) {
    const seqUser = await this.model.findByPk(userEntity.id);

    if (!seqUser) return false;

    const { firstName, lastName, email, password } = userEntity;
    await seqUser.update({ firstName, lastName, email, password });

    return new Account(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
  }

  async remove(userId) {
    const seqUser = await this.model.findByPk(userId);
    if (seqUser) {
      return seqUser.destroy();
    }
    return false;
  }

  async get(userId) {
    const seqUser = await this.model.findByPk(userId);
    return new Account(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
  }

  async getByEmail(userEmail) {
    const seqUser = await this.model.findOne({ where: { email: userEmail } });
    return new Account(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
  }

  async find() {
    const seqUsers = await this.model.findAll();
    return seqUsers.map((seqUser) => {
      return new Account(seqUser.id, seqUser.firstName, seqUser.lastName, seqUser.email, seqUser.password);
    });
  }

};
