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
  const { username, password, repeatPassword } = this.params;
  if (password !== repeatPassword) {
    alert('Passwords don`t match!');
    return;
  }
  if (username.length < 3) {
    alert('Username must be atleast 3 charachterss long!!');
    return;
  }
  if (password.length < 6) {
    alert('Password must be atleast 6 charachters long!!');
    return;
  }
  try {
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
    showError(err.message);
  }
}
