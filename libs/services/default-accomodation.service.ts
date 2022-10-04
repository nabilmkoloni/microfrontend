import { SalesAccomodation } from './../models/sales-accomodation.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class DefaultAccomodationService extends EntityCollectionServiceBase<SalesAccomodation> {


  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Accomodation',integrateServiceElementaryFactory)
  }

}
