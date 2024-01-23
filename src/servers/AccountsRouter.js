import express from 'express';
import AccountsController from '../accounts/controllers/AccountsController';
import AuthenticationController from '../accounts/controllers/AuthenticationController';
import ValidationController from '../accounts/controllers/ValidationController';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    const authenticationController = AuthenticationController(dependencies);
    const validationController = ValidationController(dependencies);

    router.route('/')
        .post(validationController.validateAccount, accountsController.createAccount)

    router.route('/:id')
        .get(accountsController.getAccount)

    router.route('/token')
        .post(authenticationController.getAccessToken)
    return router;
}
export default createRouter;