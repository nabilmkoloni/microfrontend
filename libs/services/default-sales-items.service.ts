import { SalesItems } from './../models/sales-items.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultSalesItemsService extends EntityCollectionServiceBase<SalesItems> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Sales_Items',integrateServiceElementaryFactory)
  }


  getById(id:String){
    return this.http.get(this.apiUrl+`/sales/sales_items/${id}`)
  }
}
