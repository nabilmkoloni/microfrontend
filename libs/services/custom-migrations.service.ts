import { Migrations } from './../models/migrations.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomMigrationsService extends DefaultDataService<Migrations> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Migrations',http,httpUrlGenerator)
  }
  add(body: any) {
    return this.http.post<any>(`${this.apiUrl}hotel/migrations/`,body)
    .pipe(
    map((res: any) => (res))
    );
    }

  // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
  //   if (method === 'POST') {
  //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
  //   }

  //   return super.execute(method, url, data, options);
  // }
    
    
      getWithQuery(params:string):Observable<Migrations[]>{
        return this.http.get<Migrations[]>(this.apiUrl+`/${params}`)
      }

      getById(id: string): Observable<any> {
        const url = `${this.apiUrl}hotel/migrations/number/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }
}
