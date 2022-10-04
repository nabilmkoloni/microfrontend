import { SalesTax } from './../models/sales-tax.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomSalesTaxService extends DefaultDataService<SalesTax> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Sales_Tax',http,httpUrlGenerator)
  }
  add(body: any) {
    return this.http.post<any>( `${this.apiUrl}sales/sales_tax/`,body)
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
    
    
      getWithQuery(params:string):Observable<SalesTax[]>{
        return this.http.get<SalesTax[]>(this.apiUrl+`/${params}`)
      }
}
