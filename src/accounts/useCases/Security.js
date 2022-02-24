export default {
    authenticate: async (email, password, userRepository, accessTokenManager) => {
        console.log(email)
        const user = await userRepository.getByEmail(email);
        console.log(user)
        if (!user || user.password !== password) {
            throw new Error('Bad credentials');
        }
        return accessTokenManager.generate({ email: user.email });
    },

    verify: async (token, userRepository, accessTokenManager) => {
        const decoded = await accessTokenManager.decode(token);
        const user = await userRepository.getByEmail(decoded.email);
        if (!user) {
            throw new Error('Bad token');
        }
        return user.email
    }

}
