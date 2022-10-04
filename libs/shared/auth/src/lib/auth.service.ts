import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../../apps/main-layout/src/environments/environment';
import { jwtResponse } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl + 'auth/oauth'
  private _tokenRefreshed = new BehaviorSubject<boolean>(false);
  public tokenRefreshed$ = this._tokenRefreshed.asObservable();
  constructor(private http: HttpClient, private router: Router) { }


  login(credentials: { username: string, password: string }) {
    const basicAuth = `Basic ${window.btoa('test:temp')}`;

    const headers: HttpHeaders = (new HttpHeaders()).append('Authorization', basicAuth);
    const url = `${this.baseUrl}/token`;

    const formData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    formData.append('grant_type', 'password');

    return this.http.post(url, formData, { headers: headers }).pipe(
      tap((res: any) => {
        sessionStorage.setItem('user-access', JSON.stringify(res));
      }),
      catchError((err: HttpErrorResponse) => {
        console.log('auth error =>', err.error);
        return throwError(err);
      })
    );
  }

  

  refreshToKen(object:any) {

    const basicAuth = `Basic ${window.btoa('test:temp')}`;

    const headers: HttpHeaders = (new HttpHeaders()).append('Authorization', basicAuth);
    const url = `${this.baseUrl}/token`;

    const formData = new FormData();
    formData.append('refresh_token', object.refresh_token);
    formData.append('grant_type', 'refresh_token');

    return this.http.post(url, formData, { headers: headers }).pipe(
      tap((res: any) => {
        sessionStorage.setItem('user-access', JSON.stringify(res));
        this._tokenRefreshed.next(true);
      }),
      catchError((err: HttpErrorResponse) => {
        console.log(' refresh auth error =>', err.error);
        sessionStorage.clear();
        this.router.navigate(['./']);
        return throwError(err);
      })
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['./']);
  }

  isAuthenticated(): boolean {
      const tokenData = sessionStorage.getItem('user-access');
      if (tokenData !== null) {
        return true;
      }
      return false;
  }

  addToken(request:HttpRequest<any>,token:string){
        return request.clone({
            setHeaders:{
                'Authorization':`Bearer ${token}`
            }
        })
  }

    getUserValidity(id:number){
      const url = `${environment.apiUrl}auth/auth/user/username/${id}`;
      return this.http.get(url);
    }


    getAccessDetails() {
    const tokenData = sessionStorage.getItem('user-access');
    if (tokenData !== null) {
      return JSON.parse(tokenData);
    }
    return null;
  }
}
