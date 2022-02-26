import SecurityUseCases from "../useCases/Security";


export default (dependencies) => {

    const { accountsRepository, accessTokenManager, encryptionService } = dependencies;

    const getAccessToken = async (request) => {
        // Input
        const { email, password } = request.body;
        // Treatment
        const token = await SecurityUseCases.authenticate(email, password, accountsRepository, accessTokenManager, encryptionService);
      
        //output
        return token;


    }

    const verifyAccessToken = async (request) => {

        // Input
        const authHeader = request.headers.authorization;
        // Treatment
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw Error('Missing or wrong Authorization request header');
        }
        const accessToken = authHeader.split(" ")[1];
        const email = await SecurityUseCases.verify(accessToken, accountsRepository, accessTokenManager);
        //output
        return email;
    }

    return {
        getAccessToken,
        verifyAccessToken
    };

}