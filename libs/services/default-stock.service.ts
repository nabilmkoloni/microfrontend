import { Stock } from './../models/stock.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultStockService extends EntityCollectionServiceBase<Stock> {
  //private apiUrl:string = environment.apiUrl
  constructor(private serviceElementsFactory:EntityCollectionServiceElementsFactory) { 
    super('Stock',serviceElementsFactory)
  }


 


  // getWithQuery(params:string):Observable<Stock[]>{
  //   return this.http.get<Stock[]>(this.apiUrl+`sales/stock/${params}`)
  // }

}
