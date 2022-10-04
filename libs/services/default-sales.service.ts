import { Sales } from './../models/sales.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultSalesService extends EntityCollectionServiceBase<Sales> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Sales',integrateServiceElementaryFactory)
  }



}
