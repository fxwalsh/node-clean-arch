import express from 'express';
import AccountsController from '../../interfaces/AccountsController';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const controller = AccountsController(dependencies);

    router.route('/')
        .post(async (req, res) => {
            const result = await controller.createAccount(req);
                    res.json(result)
        })
    router.route('/:id').get(async (req, res) => {
               const result = await controller.getAccount(req.params.id);
                res.json(result)
    })
        r;
        
    
}
 default createRouter;    