import 'should';
import MoviesRepository from '../../../src/movies/infrastructure/repositories/TMDBProxy'
import moviesUseCases from './../../../src/movies/useCases/Movies'


describe('Get a List of Movies', function () {
  let dependencies;
  let testMovie = {};
  beforeEach(() => {
    dependencies = {moviesRepository: new MoviesRepository()}
    testMovie.movieId = 550
    testMovie.original_title = "Fight Club"
  });

  it('should get a list of movies', async function () {
    const movies = await moviesUseCases.find(undefined,  dependencies);
    movies.page.should.equal(1);
    movies.results.length.should.equal(20)
  });

  it('should get a movie', async function () {
    const movies = await moviesUseCases.getMovie(testMovie.movieId,  dependencies);
    movies.original_title.should.equal(testMovie.original_title);

  });

  it('should get a movie review', async function () {
    const reviews = await moviesUseCases.getReviews(testMovie.movieId,  dependencies);
    reviews.length.should.be.aboveOrEqual(1);

  });

  it('should get upcoming movies', async function () {
    const movies = await moviesUseCases.findUpcoming(undefined,  dependencies);
    movies.page.should.equal(1);
    movies.results.length.should.equal(20);
  });
})