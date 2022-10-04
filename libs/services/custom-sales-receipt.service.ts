import { SalesReceipt } from './../models/sales-receipt.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomSalesReceiptService extends DefaultDataService<SalesReceipt> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Sales_Receipt',http,httpUrlGenerator)
  }
    add(body: any) {
         return this.http.post<any>( `${this.apiUrl}sales/sales_receipt/`,body)
         .pipe(
         map((res: any) => (res))
        ); 
      } 

      // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
      //   if (method === 'GET') {
      //      url = `${this.apiUrl+'sales/sales_receipt/unit/'}?pageNo=${0}&pageSize=${10}`// where 1 will be replaced dynamically
      //   }

      //   return super.execute(method, url, data, options);
      // }
        
    
      getWithQuery(params:string|any):Observable<SalesReceipt[]>{
        return this.http.get<SalesReceipt[]>(this.apiUrl+`sales/sales_receipt/unit/${params.id}?${params.size}`).pipe(map((res: any) => 
        res=[{...res,total:res.totalItems,id:0}]))
      }


      // getById(id: string): Observable<SalesReceipt> {
      //   const url = `${this.apiUrl}sales/sales_receipt/unit/${id}`;
      //   return this.http.get(url).pipe(map((res: any) => res));
      // }
    

}
