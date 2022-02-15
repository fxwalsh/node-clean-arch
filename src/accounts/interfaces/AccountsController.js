import AccountUseCases from "../useCases/Account";


export default (dependencies) => {

    const { accountsRepository, accountsSerializer } = dependencies;

    const registerAccount = async (request) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await AccountUseCases.registerAccount(firstName, lastName, email, password, accountsRepository);
        //output
        return accountsSerializer.serialize(account);
    }
    const getAccount = async (accountId) => {

        // Treatment
        const account = await AccountUseCases.getAccount(accountId, accountsRepository);
        //output
        return accountsSerializer.serialize(account);
    }
    const find = async () => {
        // Treatment
        const accounts = await AccountUseCases.find();
        //output
        return accountsSerializer.serialize(accounts);
    }
    const updateAccount = async (request) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await AccountUseCases.updateAccount(firstName, lastName, email, password, accountsRepository);
        //output
        return accountsSerializer.serialize(account);
    }

    return {
        registerAccount,
        getAccount,
        find,
        updateAccount
    };
}