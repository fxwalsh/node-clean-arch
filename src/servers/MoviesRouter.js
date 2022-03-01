import express from 'express';
import MoviesController from '../movies/interfaces/MoviesController'
import AuthenticationController from '../accounts/interfaces/AuthenticationController';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies);
    const authenticationController = AuthenticationController(dependencies);

    router.route('/:id')
        .get(moviesController.getMovie)

    router.route('/')
        .get(authenticationController.verifyAccessToken,moviesController.find)




    return router;
}
export default createMoviesRouter;