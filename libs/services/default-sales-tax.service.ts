import { SalesTax } from './../models/sales-tax.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DefaultSalesTaxService extends EntityCollectionServiceBase<SalesTax> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Sales_Tax',integrateServiceElementaryFactory)
  }


  getById(id:String){
    return this.http.get(this.apiUrl+`/sales/sales_tax/${id}`)
  }
}
