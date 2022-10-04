import { SalesAccomodation } from './../models/sales-accomodation.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomAccomodationService extends DefaultDataService<any> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Accomodation',http,httpUrlGenerator)
  }
 
   

        add(body: any):Observable<any> {
          return this.http.post<any>( `${this.apiUrl}hotel/accommodation/`,body)
          .pipe(
         map((res: any) => res = {...res,id: 1}),
         tap(res => {})
          );
          }

          addGuest(body,accomodation):Observable<any> {
            return this.http.post<any>( `${this.apiUrl}hotel/hotels/${accomodation}`,body)
            .pipe(map((res: any) => res = {...res,id: 1}),tap(res => {})
            );

            }

      // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
      //   if (method === 'POST') {
      //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
      //   }

      //   return super.execute(method, url, data, options);
      // }
     
    
      getWithQuery(params:any):Observable<any[]>{
        return this.http.get<SalesAccomodation[]>(this.apiUrl+`hotel/checkout/guest/?currency=${params.currency}&guest=${params.id}`)
      }

      getWithQueryReport(params:any):Observable<any[]>{
        return this.http.get<SalesAccomodation[]>(this.apiUrl+`hotel/checkout/guest/report/?currency=${params.currency}&guest=${params.id}`)
      }


      getById(id: string): Observable<any> {
        const url = `${this.apiUrl}hotel/accommodation/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }
}
