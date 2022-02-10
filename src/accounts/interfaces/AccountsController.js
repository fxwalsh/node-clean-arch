import AccountUseCases from "../useCases/CreateAccount";


export default (dependencies) => {

    const { accountsRepository, accountsSerializer } = dependencies;

    const createAccount = async (request) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await AccountUseCases.createAccount(firstName, lastName, email, password, accountsRepository);
        //output
        return accountsSerializer.serialize(account);
    }
    const getAccount = async (accountId) => {
        
        // Treatment
        const account = await AccountUseCases.getAccount(accountId, accountsRepository);
        //output
        return accountsSerializer.serialize(account);
    }

    return {
        createAccount,
        getAccount
    };
}