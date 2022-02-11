import Account from '../../../entities/Account'
import mongoose from 'mongoose';
import AccountRepository from '../../../entities/Repository'

export default class extends AccountRepository {

    constructor() {
        super();
        const accountsSchema = new mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            password: String,
        });
        this.model = mongoose.model('Accounts', accountsSchema);
    }

    async persist(accountEntity) {
        console.log(accountEntity)
        const { firstName, lastName, email, password } = accountEntity;
        const mongooseAccount = new this.model({ firstName, lastName, email, password });
        await mongooseAccount.save();
        return new Account(mongooseAccount.id, mongooseAccount.firstName, mongooseAccount.lastName, mongooseAccount.email, mongooseAccount.password);
    }

    async merge(accountEntity) {
        const { id, firstName, lastName, email, password } = accountEntity;
        const mongooseAccount = this.model.findByIdAndUpdate(id, { firstName, lastName, email, password });
        return new Account(mongooseAccount.id, mongooseAccount.firstName, mongooseAccount.lastName, mongooseAccount.email, mongooseAccount.password);
    }

    async remove(userId) {
        return this.model.findOneAndDelete(userId);
    }

    async get(userId) {
        const mongooseAccount = await this.model.findById(userId);
        return new Account(mongooseAccount.id, mongooseAccount.firstName, mongooseAccount.lastName, mongooseAccount.email, mongooseAccount.password);
    }

    async getByEmail(userEmail) {
        const mongooseAccount = await this.model.find({ email: userEmail });
        return new Account(mongooseAccount.id, mongooseAccount.firstName, mongooseAccount.lastName, mongooseAccount.email, mongooseAccount.password);
    }

    async find() {
        const accounts = await this.model.find();
        return accounts.map((mongooseAccount) => {
            return new Account(mongooseAccount.id, mongooseAccount.firstName, mongooseAccount.lastName, mongooseAccount.email, mongooseAccount.password);
        });
    }
}