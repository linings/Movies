import data from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function logout() {
  try {
    const result = await data.logout();

    if (result.hasOwnProperty('errorData')) {
      const error = new Error();
      Object.assign(error, result);
      throw error;
    }
    this.app.userData.username = '';
    this.app.userData.userId = '';

    showInfo(`Logout successful`);

    this.redirect('#/home');
  } catch (error) {
    console.error(error);
    showError(error.message);
  }
}
