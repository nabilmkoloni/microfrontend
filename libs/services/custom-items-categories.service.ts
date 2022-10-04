import { Categories } from './../models/categories.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Items } from '../models/items.model';

@Injectable({
  providedIn: 'root'
})
export class CustomItemsCategoriesService extends DefaultDataService<Categories> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Items_Categories',http,httpUrlGenerator)
  }
  
  // add(body: any) {
  //   return this.http.post<any>( `${this.apiUrl}taxpayer/institutions`,body)
  //   .pipe(
  //   map((res: any) => (res))
  //   );
  //   }

  // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
  //   if (method === 'POST') {
  //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
  //   }

  //   return super.execute(method, url, data, options);
  // }


  getAll(): Observable<Categories[]> {
    const url = `${this.apiUrl}sales/items_categories/all/`;
    return this.http.get<Categories[]>(url).pipe(
      map((res: any) => res)
    );
  } 

   

  // getById(id:String){
  //   return this.http.get(this.apiUrl+`sales/items/category/${id}`)
  // }
  // getWithQuery(params:any):Observable<Items[]>{
  //   return this.http.get<Items[]>(this.apiUrl+`sales/items/category/${params.catId}`)
  // }


  
}
