import { BusinessUnit, BusinessUnitInformation } from '../../apps/main-layout/src/app/models/business-unit.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { environment } from '../../apps/main-layout/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomUnitsService extends DefaultDataService<BusinessUnit> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Units',http,httpUrlGenerator)
  }
  // add(body: any) {
  //   return this.http.post<any>( this.apiUrl,body)
  //   .pipe(
  //   map((res: any) => (res.data))
  //   );
  //   }

  // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
  //   if (method === 'POST') {
  //      url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
  //   }

  //   return super.execute(method, url, data, options);
  // }
  getUnits(params:string|any):Observable<any>{
    return this.http.get<any>(this.apiUrl+`taxpayer/units/all/?name=${params.name}&?pageNo=0&pageSize=10000000`)
  }
    
      override getWithQuery(params:string|any):Observable<BusinessUnit[]>{
        return this.http.get<BusinessUnit[]>(this.apiUrl+`taxpayer/units/taxpayer/${params.id}`)
      }

      getWithQueryByCategory(params:string|any):Observable<BusinessUnit[]>{
        return this.http.get<BusinessUnit[]>(this.apiUrl+`taxpayer/units/taxpayer/${params.id}`).pipe(
          map((res:any) => res =[res.filter((x:any) => x.category === "X")])
        )
      }

      getTaxpayerInfo(params:string|any):Observable<BusinessUnit[]>{
        return this.http.get<BusinessUnit[]>(this.apiUrl+`taxpayer/taxpayer/number/${params.id}`)
      }


      getWithQueryTaxpayerInfo(params:string|any):Observable<BusinessUnit[]>{
        return this.http.get<BusinessUnit[]>(this.apiUrl+`taxpayer/units/${params.id}`)
      }


      override getById(id: string): Observable<any> {
        return this.http.get<BusinessUnit[]>(this.apiUrl+`taxpayer/units/${id}`)
      }

      getTaxpayerUnits(params: QueryParams):Observable<any>{
        const url = `${this.apiUrl}taxpayer/units/taxpayer/unit/${params['z_number']}`;
        return this.http.get<any>(url);
      }
    
      getTaxpayerBusinessUnits(params: QueryParams):Observable<any>{
        const url = `${this.apiUrl}taxpayer/units/taxpayer/${params['z_number']}`;
        return this.http.get<any>(url);
      }

      unitNotification(params: any):Observable<any>{
        const url = `${this.apiUrl}notification/notification/unit/`;
        return this.http.post<any>(url,params).pipe(map((res:any) => res));
      }

      getBusinessInfo(unit_id:any): Observable<BusinessUnitInformation> {
        const url = `${this.apiUrl}taxpayer/units/${unit_id}`;
        return this.http.get<BusinessUnitInformation>(url);
      }
 
}
