import { Rooms } from './../models/rooms.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultRoomsService extends EntityCollectionServiceBase<Rooms> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Rooms',integrateServiceElementaryFactory)
  }


  getById(id:String){
    return this.http.get(this.apiUrl+`/hotel/rooms/${id}`)
  }
  
  fileUploading(body:any){
    const url = `${this.apiUrl}hotel/rooms/upload/`;
    return this.http.post(url,body);
  }
  fileuploading(body:any, params: any){
    const url = `${this.apiUrl}hotel/rooms/upload/${params.unitId}`;
    return this.http.post(url,body);
  }
}
