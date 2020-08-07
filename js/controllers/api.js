export default class API {
  constructor(appId, apiKey, beginRequest, endRequest) {
    this.appId = appId;
    this.apiKey = apiKey;
    this.endpoints = {
      REGISTER: 'users/register',
      LOGIN: 'users/login',
      LOGOUT: 'users/logout',
    };

    this.beginRequest = () => {
      if (beginRequest) {
        beginRequest();
      }
    };

    this.endRequest = () => {
      if (endRequest) {
        endRequest();
      }
    };
  }

  host(endpoint) {
    return `https://api.backendless.com/${this.appId}/${this.apiKey}/${endpoint}`;
  }

  getOptions(headers) {
    const token = localStorage.getItem('userToken');

    const options = { headers: headers || {} };

    if (token !== null) {
      Object.assign(options.headers, { 'user-token': token });
    }
    return options;
  }

  async get(endpoint) {
    this.beginRequest();
    const result = await (
      await fetch(this.host(endpoint), this.getOptions())
    ).json(); // should make it to JSON format!
    this.endRequest();

    return result;
  }

  async getLogout(endpoint) {
    this.beginRequest();
    const result = await await fetch(this.host(endpoint), this.getOptions());
    this.endRequest();

    return result;
  }

  async post(endpoint, body) {
    const options = this.getOptions({ 'Content-Type': 'application/json' });

    options.method = 'POST';
    options.body = JSON.stringify(body);

    this.beginRequest();
    const result = (await fetch(this.host(endpoint), options)).json();
    this.endRequest();

    return result;
  }

  async put(endpoint, body) {
    const options = this.getOptions({ 'Content-Type': 'application/json' });

    options.method = 'PUT';
    options.body = JSON.stringify(body);

    this.beginRequest();
    const result = (await fetch(this.host(endpoint), options)).json();
    this.endRequest();

    return result;
  }

  async delete(endpoint) {
    const options = this.getOptions();

    options.method = 'DELETE';

    this.beginRequest();
    const result = (await fetch(this.host(endpoint), options)).json();
    this.endRequest();

    return result;
  }

  async register(username, password) {
    return this.post(this.endpoints.REGISTER, {
      username,
      password,
    });
  }

  async login(username, password) {
    const result = await this.post(this.endpoints.LOGIN, {
      login: username,
      password,
    });

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    return result;
  }

  async logout() {
    const result = await this.getLogout(this.endpoints.LOGOUT);

    localStorage.removeItem('userToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    return result;
  }
}
