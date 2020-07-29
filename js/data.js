import { beginRequest, endRequest } from '../js/notification.js';
function host(endpoint) {
  return `https://api.backendless.com/3B6BF28C-FF60-DD2D-FF98-357BA2908E00/B3745741-2DA0-4DEF-B21F-D803A9ACC5A1/${endpoint}`;
}

const endpoints = {
  REGISTER: 'users/register',
  LOGIN: 'users/login',
  LOGOUT: 'users/logout',
  MOVIES: 'data/movies',
  MOVIE_BY_ID: 'data/movies/',
};

async function register(username, password) {
  beginRequest();
  const result = (
    await fetch(host(endpoints.REGISTER), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
  ).json();

  endRequest();
  return result;
}

async function login(username, password) {
  beginRequest();
  const result = await (
    await fetch(host(endpoints.LOGIN), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: username,
        password,
      }),
    })
  ).json();

  localStorage.setItem('userToken', result['user-token']);
  localStorage.setItem('username', result.username);
  localStorage.setItem('userId', result.objectId);

  endRequest();
  return result;
}

async function logout() {
  beginRequest();

  const token = localStorage.getItem('userToken');
  localStorage.removeItem('userToken');

  const result = fetch(host(endpoints.LOGOUT), {
    headers: {
      'user-token': token,
    },
  });

  endRequest();
  return result;
}
//get all movies
async function getAllMovies() {
  beginRequest();

  const token = localStorage.getItem('userToken');

  const result = (
    await fetch(host(endpoints.MOVIES), {
      headers: {
        'user-token': token,
      },
    })
  ).json();

  endRequest();
  return result;
}

//get movie by ID
async function getMovieById(id) {
  beginRequest();

  const token = localStorage.getItem('userToken');

  const result = (
    await fetch(host(endpoints.MOVIE_BY_ID + id), {
      headers: {
        'user-token': token,
      },
    })
  ).json();

  endRequest();
  return result;
}
//create movie

async function createMovie(movie) {
  beginRequest();

  const token = localStorage.getItem('userToken');

  let result = (
    await fetch(host(endpoints.MOVIES), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
      },
      body: JSON.stringify(movie),
    })
  ).json();

  endRequest();
  return result;
}
//edit movie

async function updateMovie(id, updatedProps) {
  beginRequest();

  const token = localStorage.getItem('userToken');

  const result = (
    await fetch(host(endpoints.MOVIE_BY_ID + id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
      },
      body: JSON.stringify(updatedProps),
    })
  ).json();

  endRequest();
  return resultk;
}

async function deleteMovie(id) {
  beginRequest();

  const token = localStorage.getItem('userToken');

  const result = fetch(host(endpoints.MOVIE_BY_ID + id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'user-token': token,
    },
  }).json();

  endRequest();
  return result;
}
//delete movie
async function getMoviesByOwner(ownerId) {
  beginRequest();

  const token = localStorage.getItem('userToken');

  const result = (
    await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
      },
    })
  ).json();

  endRequest();
  return result;
}
//get movies by userID
async function buyTicket(movie) {
  const newTickets = movie.tickets - 1;
  const movieId = movie.objectId;

  return updateMovie(movieId, { tickets: newTickets });
}
//buy ticket

const data = { register, login, logout };
export default data;
