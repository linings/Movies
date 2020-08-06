/* globals Sammy */
import home from './controllers/home.js';
import register, { registerPost } from './controllers/register.js';
import login, { loginPost } from './controllers/login.js';
import logout from './controllers/logout.js';
import catalog, {
  create,
  details,
  edit,
  createPost,
  buyTicket,
  getMoviesByOwner,
  editPost,
  deleteMovie
} from './controllers/movies.js';

window.addEventListener('load', () => {
  const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.userData = {
      username: localStorage.getItem('username') || '',
      userId: localStorage.getItem('userId') || '',
      movies: [],
    };

    this.get('/', home);
    this.get('index.html', home);
    this.get('#/home', home);

    this.get('#/register', register);

    this.get('#/login', login);

    this.get('#/catalog', catalog);

    this.get('#/details/:id', details);

    this.get('#/create', create);

    this.get('#/edit/:id', edit);

    this.get('#/logout', logout);

    this.post('#/register', (ctx) => {
      registerPost.call(ctx);
    });

    this.post('#/login', (ctx) => {
      loginPost.call(ctx);
    });

    this.post('#/create', (ctx) => {
      createPost.call(ctx);
    });

    this.get('#/my_movies', getMoviesByOwner);

    this.post('#/edit/:id', (ctx) => {
      editPost.call(ctx);
    });

    this.get('#/delete/:id', deleteMovie);

  });

  app.run();
});
