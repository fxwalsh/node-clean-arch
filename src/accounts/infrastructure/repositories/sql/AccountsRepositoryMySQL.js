import sequelize from './sequelize'
import Account from '../../../entities/Account'
import AccountRepository from '../../../entities/Repository'

module.exports = class extends AccountRepository {

  constructor() {
    super();
    // Constucts ORM in contstuctor. Probably would be better in separate module to be honest!
    try{
    const db = sequelize.connect(process.env.DATABASE_URL);
    this.model = db.model('account');
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
