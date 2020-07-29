import data from '../data.js';
import { showError, showInfo } from '../notification.js';

export default async function login() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
    loginForm: await this.load('./templates/user/loginForm.hbs'),
  };
  this.partial('./templates/user/login.hbs', this.app.userData);
}

export async function loginPost() {
  const { username, password } = this.params;
  try {
    const result = await data.login(username, password);

    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    this.app.userData.username = result.username;
    this.app.userData.userId = result.objectId;

    showInfo(`Successfully logged in as ${result.username}`);

    this.redirect('#/home');
  } catch (error) {
    console.error(error);
    showError(err.message);
  }
}
