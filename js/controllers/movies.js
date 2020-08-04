import data from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function catalog() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    movie: await this.load('./templates/movie/movie.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };

  const movies = await data.getAllMovies();
  this.app.userData.movies = movies;
  const context = Object.assign(
    { origin: encodeURIComponent('#/catalog') },
    this.app.userData
  );

  this.partial('./templates/movie/catalog.hbs', context);
}

export async function getMoviesByOwner() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    // movie: await this.load('./templates/common/movie.hbs'),
    ownMovie: await this.load('./templates/movie/ownMovie.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };

  const movies = await data.getMoviesByOwner();
  this.app.userData.movies = movies;

  const context = Object.assign(
    { myMovies: true, origin: encodeURIComponent('#/my_movies') },
    this.app.userData
  );

  this.partial('./templates/movie/catalog.hbs', context);
}
export async function create() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };
  this.partial('./templates/movie/create.hbs', this.app.userData);
}

export async function createPost() {
  try {
    const { title, imageUrl, description, genres, tickets } = this.params;
    const movie = {
      title,
      imageUrl,
      description,
      genres,
      tickets: +tickets,
    };
    if (title.length === 0) {
      throw new Error('Title is required');
    }

    const result = await data.createMovie(movie);

    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    showInfo(`Successfully created movie`);
    this.redirect('#/details/' + result.objectId);
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}

export async function details() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };

  const movieId = this.params.id;
  let movie = this.app.userData.movies.find((m) => m.objectId === movieId);

  if (movie === undefined) {
    movie = await data.getMovieById(movieId);
  }

  const context = Object.assign(
    { movie, origin: encodeURIComponent('#/details/' + movieId) },
    this.app.userData
  );
  this.partial('./templates/movie/details.hbs', context);
}

export async function edit() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
  };
  this.partial('./templates/movie/edit.hbs', this.app.userData);
}
export async function buyTicket() {
  const movieId = this.params.id;
  let movie = this.app.userData.movies.find((m) => m.objectId === movieId);

  if (movie === undefined) {
    movie = await data.getMovieById(movieId);
  }

  try {
    const result = await data.buyTicket(movie);

    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    showInfo(`Bougth ticket for ${movie.title}`);
    this.redirect(this.params.origin);
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}
