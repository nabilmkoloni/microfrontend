import { Stock } from './../models/stock.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomStockService extends DefaultDataService<Stock> {

  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Stock',http,httpUrlGenerator)
  }
      add(body: any):Observable<any> {
        return this.http.post<any>( `${this.apiUrl}sales/stock/`,body)
        .pipe(
       map((res: any) => res = {...res,name: res.item_id.name,unitMeasure:res.item_id.unitMeasure}),
       tap(res => {})
        );
        }

      uploadStocks(param,body){
        const url = `${this.apiUrl}sales/stock/upload/file/${param.unitId}`;
        return this.http.post<any>(url,body).pipe(map((res:any) => res));
      }

      addStock(body:any){
        const url = `${this.apiUrl}sales/stock/`;
        return this.http.post<any>(url,body).pipe(map((res:any) => res));
      }

      deleteStock(stockId){
        const url = `${this.apiUrl}sales/stock/${stockId}`;
        return this.http.delete(url).pipe(map((res:any) => res));
      }

       update(body:any):Observable<Stock>{
            return this.http.put<Stock>(this.apiUrl+`sales/stock/${body.id}`,body.changes)
        }


        // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
        //   if (method === 'POST') {
        //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
        //   }

        //   return super.execute(method, url, data, options);
        // }

        getAllMeasurements(){
          const url = `${this.apiUrl}sales/measurement/`;
          return this.http.get(url).pipe(map((res:any) => res))
        }
          
          
      getWithQuery(params:string|any):Observable<Stock[]>{
        //return this.http.get<Stock[]>(this.apiUrl+`sales/stock/${params}`)

        const url = `${this.apiUrl}sales/stock/stockByBusinesUnit/${params.id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

      getAll() {
        const stock = localStorage.getItem('stock')
        const url = `${this.apiUrl}sales/stock/stockByBusinesUnit/${stock}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }


      getById(id: string): Observable<any> {
        return this.http.get<Stock[]>(this.apiUrl+`sales/stock/${id}`)
      }

      getInventoryItems(params: QueryParams): Observable<any> {
        const url = `${this.apiUrl}sales/stock/stockByBusinesUnit/${params.Business_Unit}`;
        return this.http.get<any>(url);
      }

      getNonInventoryItems(search:string, pageNo:any, pageSize:any): Observable<any> {
        let params = new HttpParams;

        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
        params = params.append('search', String(search));
        
        const url = `${this.apiUrl}sales/items/all/`;
        return this.http.get<any>(url, { params });
      }

 

}
