import { beginRequest, endRequest } from '../js/notification.js';
import API from './api.js';

const endpoints = {
  MOVIES: 'data/movies',
  MOVIE_BY_ID: 'data/movies/',
};

const api = new API(
  '3B6BF28C-FF60-DD2D-FF98-357BA2908E00',
  'B3745741-2DA0-4DEF-B21F-D803A9ACC5A1',
  beginRequest,
  endRequest
);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

//get all movies
async function getAllMovies() {
  return api.get(endpoints.MOVIES);
}

//get movie by ID
async function getMovieById(id) {
  return api.get(endpoints.MOVIE_BY_ID + id);
}
//create movie
async function createMovie(movie) {
  return api.post(endpoints.MOVIES, movie);
}
//edit movie

async function updateMovie(id, updatedProps) {
  return api.put(endpoints.MOVIE_BY_ID + id, updatedProps);
}

async function deleteMovie(id) {
  return api.delete(endpoints.MOVIE_BY_ID + id);
}
//delete movie
async function getMoviesByOwner() {
  const ownerId = localStorage.getItem('userId');
  api.get(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`);
}
//get movies by userID
async function buyTicket(movie) {
  const newTickets = movie.tickets - 1;
  const movieId = movie.objectId;

  return await updateMovie(movieId, { tickets: newTickets });
}
//buy ticket

const data = {
  register,
  login,
  logout,
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByOwner,
  buyTicket,
};
export default data;
