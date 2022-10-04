import { BusinessUnit } from '../../apps/main-layout/src/app/models/business-unit.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from '../../apps/main-layout/src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultUnitsService extends EntityCollectionServiceBase<BusinessUnit> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Units',integrateServiceElementaryFactory)
  }


}
