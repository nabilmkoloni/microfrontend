import { HotelServices } from './../models/hotel-services.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomHotelServicesService extends DefaultDataService<HotelServices> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Services',http,httpUrlGenerator)
  }
      add(body: any) {
        return this.http.post<any>(`${ this.apiUrl}hotel/services/`,body)
        .pipe( map((res: any) => (res))); 
      }

    
      getWithQuery(params:string|any):Observable<HotelServices[]>{
        return this.http.get<HotelServices[]>(this.apiUrl+`hotel/hotels/services/${params.id}?${params.size}`).pipe(map((res: any) => res['service']))
      }

      getById(id: number): Observable<HotelServices> {
        const url = `${this.apiUrl}hotel/services/sales/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }
      
      getByKey(id: number): Observable<HotelServices> {
        const url = `${this.apiUrl}sales/sales/item/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

      addServices(body:any){
        const url = `${this.apiUrl}hotel/services/`;
        return this.http.post(url,body).pipe(map((res:any) => res))
      }



}
