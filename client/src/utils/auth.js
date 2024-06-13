import decode from 'jwt-decode';

class AuthService {
  // Decoded the user profile from the token
  getProfile() {
    return decode(this.getToken());
  }

  // Checked if the user was logged in by verifying the token
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Checked if the token was expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Retrieved the token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Stored the token in localStorage and redirected to the /users page
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/users');
  }

  // signup(idToken) {
  //   localStorage.setItem('id_token', idToken);
  //   window.location.assign('/profile');
  // }

  // Removed the token from localStorage and redirected to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
