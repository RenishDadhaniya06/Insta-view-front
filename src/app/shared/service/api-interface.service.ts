import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {
  constructor(private http: HttpClient) {
  }

  post(path: string, body: any, isAuth = false, params?: any, responseType = false) {
    if (responseType) {
      return this.http.post(environment.baseUrl + path, body, { params, headers: this.getHeaders(isAuth), responseType: 'arraybuffer' });
    }
    return this.http.post(environment.baseUrl + path, body, { params, headers: this.getHeaders(isAuth) });
  }

  patch(path: string, body: any, isAuth = false, params?: any) {
    return this.http.patch(environment.baseUrl + path, body, { params, headers: this.getHeaders(isAuth) });
  }

  get(path: string, isAuth = false, params?: any) {
    return this.http.get(environment.baseUrl + path, { params, headers: this.getHeaders(isAuth) });
  }

  delete(path, isAuth = false, params?) {
    return this.http.delete(environment.baseUrl + path, { params, headers: this.getHeaders(isAuth) });
  }

  getHeaders(authHeaderRequired: boolean): HttpHeaders {
    let header = new HttpHeaders();

    if (authHeaderRequired) {
      const token = JSON.parse(window.localStorage.getItem('auth'))['custom']['authentication_token'];
      header = header.set('Authorization', `Bearer ${token}`);
    }

    return header;
  }
}
