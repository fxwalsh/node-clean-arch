import fetch from 'node-fetch';
import MoviesRepositoryContract from '../../entities/RepositoryContract'
import dotenv from 'dotenv'

export default class extends MoviesRepositoryContract {

  constructor() {
    super();
    dotenv.config()
  }

  find(query) {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  }

  get(movieId) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
      .catch((error) => {
        throw error
      });
  }

  getReviews(movieId) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}`
    ).then((res) => res.json())
      .then((json) => {
        return json.results;
      }).catch((error) => {
        throw error
      });
  }
}
