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
  return (
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
}

async function login(username, password) {
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

  return result;
}

async function logout() {
  const token = localStorage.getItem('userToken');
  return fetch(host(endpoints.LOGOUT), {
    headers: {
      'user-token': token,
    },
  });
}
//get all movies
async function getAllMovies() {
  const token = localStorage.getItem('userToken');

  return (
    await fetch(host(endpoints.MOVIES), {
      headers: {
        'user-token': token,
      },
    })
  ).json();
}

//get movie by ID
async function getMovieById(id) {
  const token = localStorage.getItem('userToken');

  return (
    await fetch(host(endpoints.MOVIE_BY_ID + id), {
      headers: {
        'user-token': token,
      },
    })
  ).json();
}
//create movie

async function createMovie(movie) {
  const token = localStorage.getItem('userToken');

  return (
    await fetch(host(endpoints.MOVIES), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
      },
      body: JSON.stringify(movie),
    })
  ).json();
}
//edit movie

async function updateMovie(id, updatedProps) {
  const token = localStorage.getItem('userToken');

  return (
    await fetch(host(endpoints.MOVIE_BY_ID + id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
      },
      body: JSON.stringify(updatedProps),
    })
  ).json();
}

async function deleteMovie(id) {
  const token = localStorage.getItem('userToken');

  return fetch(host(endpoints.MOVIE_BY_ID + id), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'user-token': token,
    },
  }).json();
}
//delete movie
async function getMoviesByOwner(ownerId) {
  const token = localStorage.getItem('userToken');

  return (
    await fetch(host(endpoints.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
      },
    })
  ).json();
}
//get movies by userID
async function buyTicket(movie) {
  const newTickets = movie.tickets - 1;
  const movieId = movie.objectId;

  return updateMovie(movieId, { tickets: newTickets });
}
//buy ticket