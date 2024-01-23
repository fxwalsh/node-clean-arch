import AccountUseCases from "../useCases/Account";


export default (dependencies) => {

   // const { accountsRepository, accountsSerializer, encryptionService } = dependencies;

    const createAccount = async (request, response, next) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await AccountUseCases.registerAccount(firstName, lastName, email, password, dependencies);
        const output = dependencies.accountsSerializer.serialize(account)
        //output
        response.status(201).json(output)
    }
    const getAccount = async (request,response,next) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await AccountUseCases.getAccount(accountId, dependencies);
        const output = dependencies.accountsSerializer.serialize(account)
        //output
        response.status(200).json(output)
    }
    const find = async (request, response,next) => {
        // Treatment
        const accounts = await AccountUseCases.find();
        //output
        response.status(200).json(accounts)
    }
    const updateAccount = async (request,response) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await AccountUseCases.updateAccount(firstName, lastName, email, password, dependencies);
        //output
        const output = dependencies.accountsSerializer.serialize(account)
        //output
        response.status(200).json(output)
    }

    return {
        createAccount,
        getAccount,
        find,
        updateAccount
    };
}