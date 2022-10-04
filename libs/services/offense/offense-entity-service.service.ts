import { Offense } from './../../models/offense.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OffenseEntityServiceService extends EntityCollectionServiceBase<Offense> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Offense',integrateServiceElementaryFactory)
  }
}
