import { HotelRooms } from './../models/hotel-rooms.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomHotelRoomsService extends DefaultDataService<HotelRooms> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Hotel_Rooms',http,httpUrlGenerator)
  }
  add(body: any) {
    return this.http.post<any>( `${this.apiUrl}hotel/hotel_rooms/`,body)
    .pipe(
    map((res: any) => (res))
    );
    }

 
    addRoom(body: any) {
      return this.http.post<any>( `${this.apiUrl}hotel/rooms/`,body)
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
      update(body:any):Observable<HotelRooms>{
        return this.http.put<HotelRooms>(this.apiUrl+`hotel/rooms/${body.id}`,body)
      }
        
      getWithQuery(params:string):Observable<HotelRooms[]>{
        return this.http.get<HotelRooms[]>(this.apiUrl+`/${params}`)
      }

      getWithQueryRooms(params:string):Observable<HotelRooms[]>{
        return this.http.get<HotelRooms[]>(`${this.apiUrl}hotel/rooms/unit/${params}`)
      }

      getById(id: number): Observable<any> {
        const url = `${this.apiUrl}hotel/hotel_rooms/unit/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

      getRoomById(id: number): Observable<any> {
        const url = `${this.apiUrl}hotel/rooms/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

    }