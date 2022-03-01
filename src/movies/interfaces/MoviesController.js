import MoviesUseCases from "./../useCases/Movies";


export default (dependencies) => {

    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await MoviesUseCases.getMovie(movieId, dependencies);
        //output
        response.status(200).json(movie)
    }
    const find = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const accounts = await MoviesUseCases.find(query, dependencies);
        //output
        response.status(200).json(accounts)
    }



    return {
        getMovie,
        find
    };
}