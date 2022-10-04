import { SalesReceipt } from './../models/sales-receipt.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultSalesReceiptService extends EntityCollectionServiceBase<SalesReceipt> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Sales_Receipt',integrateServiceElementaryFactory)
  }


  
}
