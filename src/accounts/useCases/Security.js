export default {
    authenticate: async (email, password, userRepository, accessTokenManager, encryptionService) => {
       
        const user = await userRepository.getByEmail(email);
       
        if (!encryptionService.compare(password,user.password)) {
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
