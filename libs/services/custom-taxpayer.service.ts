import { Znumber } from '../../apps/dashboard/src/app/models/znumber.model';
import { Taxpayer, TaxpayerData } from '../../apps/dashboard/src/app/models/taxpayer.model';
import { Injectable } from '@angular/core';
import { environment } from '../../apps/main-layout/src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomTaxpayerService extends DefaultDataService<Taxpayer> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Taxpayer',http,httpUrlGenerator)
  }
  // add(body: any) {
  //   return this.http.post<any>( this.apiUrl,body)
  //   .pipe(
  //   map((res: any) => (res.data))
  //   );
  //   }

    // protected execute(method: HttpMethods, url: string, data?: any, options?: any): Observable<any> {
    //   if (method === 'POST') {
    //     url = `${data.mode=='bind'?this.apiUrl+'bind':this.apiUrl+'unbind'}?institutionId=${data.mode=='bind'?data.institution.id:data.institutionId}&messageId=${data.messageId}`// where 1 will be replaced dynamically
    //   }

    //   return super.execute(method, url, data, options);
    // }
  
  
    override getWithQuery(params:string):Observable<Taxpayer[]>{
      return this.http.get<Taxpayer[]>(this.apiUrl+`taxpayer/taxpayer/number/${params}`)
    }


    override getById(id: string): Observable<Taxpayer> {
      const url = `${this.apiUrl}taxpayer/units/taxpayer/${id}`;
      return this.http.get(url).pipe(map((res: any) => res));
    }

    getBusinesUnits(Znumber:string){
      const url = `${this.apiUrl}taxpayer/units/taxpayer/unit/${Znumber}`;
      return this.http.get(url).pipe(map((res: any) => res));
    }

    getTaxpayerData(unit:number):Observable<Taxpayer[]>{
      const url = `${this.apiUrl}taxpayer/units/sales/taxpayer/?pageNo=0&pageSize=10&unit=${unit}`;
      return this.http.get(url).pipe(map((res:any) => res));
    }

    getTaxpayerOffence(params: { taxpayerId: any; }){
      const url = `${this.apiUrl}lottery/report/offence/?edate=0&pageNo=0&pageSize=10&sdate=0&search=0&taxpayer=${params.taxpayerId}`;
      return this.http.get(url).pipe(map((res:any) => res))
    }

    getUserData(user_id: any){
      const url = `${this.apiUrl}auth/auth/user/${user_id}`;
      return this.http.get(url).pipe(map((res:any) => res))
    }

    taxpayerNotification(params: any){
      const url = `${this.apiUrl}notification/notification/taxpayer/`;
      return this.http.post(url,params).pipe(map((res:any) => res))
    }

    getAgentInfo(znumber: any) {
      const url = `${this.apiUrl}taxpayer/taxpayer/${znumber}`;
      return this.http.get(url).pipe(map((res:any) => res));
    }

    getTaxpayerInfo(params: QueryParams): Observable<TaxpayerData> {
      const url = `${this.apiUrl}taxpayer/taxpayer/number/${params['z_number']}`;
      return this.http.get<TaxpayerData>(url, { params });
    }

}
