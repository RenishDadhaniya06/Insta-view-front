import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiInterfaceService } from './api-interface.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiInterfaceService, private router: Router) { }

  async login(email: string, password: string) {
    try {
      const res = await this.api.post('/api/Auth/Authenticate', { email, password }).toPromise();
      debugger
      if (res['token']) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  async logout() {
    window.localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    const userToken = window.localStorage.getItem('auth');
    const parsedUserToken = JSON.parse(userToken);

    if (((parsedUserToken?.exp * 1000) > Date.now())) {
      return true;
    }
    return false;
  }

  getUser() {
    return JSON.parse(window.localStorage.getItem('auth'));
  }

}
