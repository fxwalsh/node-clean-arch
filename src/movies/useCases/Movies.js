import Review from '../entities/Review';

export default {
  getMovie: (movieId, {moviesRepository}) => {
    return moviesRepository.get(movieId);
  },
  find: (query, {moviesRepository}) => {
    return moviesRepository.find(query);
  },
  findUpcoming: (query, {moviesRepository}) => {
    return moviesRepository.findUpcoming(query);
  },
  addReview: (movieId, author, content, {moviesRepository}) => {
    const review = new Review(author, content);
    return moviesRepository.addReview(movieId, review);
  },
  getReviews: (movieId, {moviesRepository}) => {
    return moviesRepository.getReviews(movieId);
  }
}

