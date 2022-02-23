import 'should';
import MoviesRepository from '../../../src/movies/infrastructure/repositories/TMDBProxy'
import moviesUseCases from './../../../src/movies/useCases/Movies'


describe('Get a List of Movies', function () {
  let moviesRepository;
  let testMovie = {};
  beforeEach(() => {
    moviesRepository = new MoviesRepository()
    testMovie.movieId = 550
    testMovie.original_title = "Fight Club"
  });

  it('should get a list of movies', async function () {
    const movies = await moviesUseCases.find(null, moviesRepository);
    movies.page.should.equal(1);
    movies.results.length.should.equal(20)
  });

  it('should get a movie', async function () {
    const movies = await moviesUseCases.getMovie(testMovie.movieId, moviesRepository);
    movies.original_title.should.equal(testMovie.original_title);

  });

  it('should get a movie review', async function () {
    const reviews = await moviesUseCases.getReviews(testMovie.movieId, moviesRepository);
    reviews.length.should.be.aboveOrEqual(1);

  });
})