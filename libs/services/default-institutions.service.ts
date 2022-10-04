import { Institutions } from './../models/institutions.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultInstitutionsService extends EntityCollectionServiceBase<Institutions> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Institutions',integrateServiceElementaryFactory)
  }


  getById(id:String){
    return this.http.get(this.apiUrl+`/taxpayer/institutions/${id}`)
  }
}
