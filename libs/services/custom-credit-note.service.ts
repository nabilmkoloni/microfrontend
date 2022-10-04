import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomCreditNoteService extends DefaultDataService<any> {
    private apiUrl:string = environment.apiUrl;
  
  
    constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
      super('Credit',http,httpUrlGenerator)
    }
        add(body: any) {
          return this.http.post<any>( `${this.apiUrl}sales/credit/`,body)
          .pipe(
          map((res: any) => (res))
          );
          }

      
        getWithQuery(params:string|any):Observable<any[]>{
          return this.http.get<any[]>(this.apiUrl+`sales/credit/unit/${params}`)
        }
  
        getById(id: number): Observable<any> {
          const url = `${this.apiUrl}sales/credit/${id}`;
          return this.http.get(url).pipe(map((res: any) => res));
        }
  
}
