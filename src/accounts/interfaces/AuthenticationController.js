import SecurityUseCases from "../useCases/Security";


export default (dependencies) => {

    const { accountsRepository, accessTokenManager, encryptionService } = dependencies;

    const getAccessToken = async (request, response, next) => {
        // Input
        const { email, password } = request.body;
        // Treatment
        const token = await SecurityUseCases.authenticate(email, password, accountsRepository, accessTokenManager, encryptionService);
      
        //output
        response.status(200).json({token : token});


    }

    const verifyAccessToken = async (request, response, next) => {

        // Input
        const authHeader = request.headers.authorization;

        // Treatment
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            response.status(403).json({message:"Forbidden"})
        }
        const accessToken = authHeader.split(" ")[1];
        await SecurityUseCases.verify(accessToken, accountsRepository, accessTokenManager);

        //output
        next();
    }

    return {
        getAccessToken,
        verifyAccessToken
    };

}