import { Rooms } from './../models/rooms.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomRoomsService extends DefaultDataService<Rooms> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Rooms',http,httpUrlGenerator)
  }
  // add(body: any) {
  //   return this.http.post<any>( this.apiUrl,body)
  //   .pipe(
  //   map((res: any) => (res.data))
  //   );
  //   }

  // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
  //   if (method === 'POST') {
  //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
  //   }

  //   return super.execute(method, url, data, options);
  // }
    
      getAll(): Observable<Rooms[]> {
        const url = `${this.apiUrl}hotel/rooms/`;
        return this.http.get<Rooms[]>(url).pipe(
          map((res: any) => res)
        );
      } 
        
      getWithQuery(params:string|any):Observable<Rooms[]>{
        return this.http.get<Rooms[]>(this.apiUrl+`hotel/rooms/free/${params.id}`)
      }

      getRoomByUnitId(params):Observable<Rooms[]>{
        return this.http.get<Rooms[]>(this.apiUrl+`hotel/rooms/unit/${params.unit_id}`).pipe(
          map((res:any) => res=[{...res.filter((x:any) => x.roomName === params.room)}])
        )
      }
}
