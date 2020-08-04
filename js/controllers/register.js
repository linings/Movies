import data from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function register() {
  this.partials = {
    header: await this.load('./templates/common/header.hbs'),
    footer: await this.load('./templates/common/footer.hbs'),
    registerForm: await this.load('./templates/user/registerForm.hbs'),
  };
  this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function registerPost() {
  try {
    const { username, password, repeatPassword } = this.params;
    if (password !== repeatPassword) {
      throw new Error('Passwords don`t match!');
    }
    if (username.length < 3) {
      throw new Error('Username must be atleast 3 charachterss long!!');
    }
    if (password.length < 6) {
      throw new Error('Password must be atleast 6 charachters long!!');
    }

    const result = await data.register(username, password);
    console.log(result);
    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    showInfo(`Successfully registered`);
    this.redirect('#/login');
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}
