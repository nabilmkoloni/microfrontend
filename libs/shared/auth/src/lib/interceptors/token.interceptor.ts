import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false
  private RefreshTokenSubject = new BehaviorSubject<any>(true)

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.includes('auth/oauth/token')) {
      const userData = this.authService.getAccessDetails();
      if (userData != null) {
        request = request.clone({
          headers: (new HttpHeaders()).append('Authorization', 'Bearer ' + userData.access_token)
        });
      }
    }
    return next.handle(request).pipe(catchError(error => {

      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.handle401Error(request,next)
        //return throwError(error)
        
      } else {  
        return throwError(error)
      }

    }))
  }

  handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
       
        
        const userData = this.authService.getAccessDetails();
        this.authService.refreshToKen(userData).subscribe((response)=>{
      
            
            if (response) {
              //this.RefreshTokenSubject.next(true);
              /* if (!request.url.includes('auth/oauth/token')) {
                request = request.clone({
                  headers: (new HttpHeaders()).append('Authorization', 'Bearer ' + response.access_token)
                });
                
                
              } */
            }
            
        })
         // if (!this.isRefreshing) {
         //     this.isRefreshing = true
         //     this.RefreshTokenSubject.next(null);
           
         //     return this.authService.refreshToKen(userData).pipe(
         //         switchMap((token:any)=>{
         //                 this.isRefreshing = false
         //                 this.RefreshTokenSubject.next(token.access_token);
         //                 return next.handle(this.authService.addToken(request,token.access_token));
         //         })
         //     )
         // } else {
         //       return this.RefreshTokenSubject.pipe(
         //           filter(token => token != null),
         //           take(1),
         //           switchMap(token => {
         //               return next.handle(this.authService.addToken(request,token))
         //           })
         //       )
         // }
   }

  
}
