import { Items } from './../models/items.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomItemsService extends DefaultDataService<Items> {

  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Items',http,httpUrlGenerator)
  }
      add(body: any) {
        return this.http.post<any>( `${this.apiUrl}sales/items/`,body)
        .pipe(
        map((res: any) => (res))
        );
        }

        getAllItems(params:any){
          const url = `${this.apiUrl}sales/items/all/?pageNo=${params.pageNo}&pageSize=${params.pageSize}&search=${params.search}`;
          return this.http.get(url).pipe(map((res:any) => res=[{
            totalItems:res.totalItems,
            itemList:res.salesReport,
            totalPages:res.totalPages,
            currentPage:res.currentPage
          }]))
        }

        getItemsByCategories(params:any):Observable<Items[]>{
          return this.http.get<Items[]>(this.apiUrl+`sales/items/category/${params.catId}`)
        }

        getItemsSelectedItem(itemId:any){
          const url = `${this.apiUrl}sales/items/${itemId}`
          return this.http.get(url).pipe(map((res:any) => res));
        }
    
          
          
      getWithQuery(params:string):Observable<Items[]>{
        return this.http.get<Items[]>(this.apiUrl+`sales/items/name/${params}`)
      }


      getById(id: string): Observable<any> {
        const url = `${this.apiUrl}sales/items/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

      getAll(): Observable<any[]> {
        const url = `${this.apiUrl}sales/items/`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res)
        );
      } 

 
}
