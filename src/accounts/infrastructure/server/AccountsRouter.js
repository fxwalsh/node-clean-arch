import express from 'express';
import AccountsController from '../../interfaces/AccountsController';
import AuthenticationController from '../../interfaces/AuthenticationController';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    const authenticationController = AuthenticationController(dependencies);

    router.route('/')
        .post(async (req, res) => {
            const result = await accountsController.createAccount(req);
            res.json(result)
        })
        router.route('/:id').get(async (req, res) => {
            const result = await accountsController.getAccount(req.params.id);
            res.json(result)
        })
    router.route('/token')
    .post(async (req, res) => {
        const result = await authenticationController.getAccessToken(req);
        res.json(result)
    })
    return router;
}
export default createRouter;