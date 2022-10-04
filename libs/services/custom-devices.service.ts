import { Devices } from './../models/devices.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomDevicesService extends DefaultDataService<Devices> {

  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Devices',http,httpUrlGenerator)
  }
      add(body: any) {
        return this.http.post<any>( `${this.apiUrl}sales/items/`,body)
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
          
          
      getWithQuery(params:string|any):Observable<Devices[]>{
        return this.http.get<Devices[]>(this.apiUrl+`taxpayer/assigned/business/${params.id}`)
      }


      getById(id: string): Observable<any> {
        const url = `${this.apiUrl}sales/items/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

}
