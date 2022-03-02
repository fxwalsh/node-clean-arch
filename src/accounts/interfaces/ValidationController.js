
export default (dependencies) => {

    const { validators } = dependencies;

    const validateAccount = async (request, response, next) => {
        // Input
        try {
            const validated = await validators['account'].validateAsync(request.body)
            request.body = validated
            next()
        } catch (err) {
            //* Pass err to next
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            next(new Error( {message: err.message}))
        }
    }

    return {
        validateAccount
    };

}