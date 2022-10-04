import { SalesItems } from './../models/sales-items.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomSalesItemsService extends DefaultDataService<SalesItems> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Sales_Items',http,httpUrlGenerator)
  }
  add(body: any) {
    return this.http.post<any>( `${this.apiUrl}sales/sales_items/`,body)
    .pipe(
    map((res: any) => (res))
    );
    }

  // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
  //   if (method === 'POST') {
  //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
  //   }

  //   return super.execute(method, url, data, options);
  // }
    
    
      getWithQuery(params:string|any):Observable<SalesItems[]>{
        return this.http.get<SalesItems[]>(this.apiUrl+`sales/sales_items/getMostSoldItemByBussUnit?BusinessUnit=${params.id}`)
      }
}
