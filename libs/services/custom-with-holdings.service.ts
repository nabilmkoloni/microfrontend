import { Withholding } from './../models/withholding.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomWithHoldingsService extends DefaultDataService<Withholding> {
  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('With',http,httpUrlGenerator)
  }
      add(body: any) {
        return this.http.post<any>( `${this.apiUrl}sales/withold/`,body)
        .pipe(
        map((res: any) => (res))
        );
        }

    
        update(body:any):Observable<Withholding>{
          return this.http.put<Withholding>(this.apiUrl+`sales/withold/${body.id}`,body.changes)
        }


        getWithQuery(params:string|any):Observable<Withholding[]>{
          return this.http.get<Withholding[]>(this.apiUrl+`sales/withold/agent/${params.id}`)
        }

        getWithholdings(params):Observable<Withholding[]>{
          return this.http.get<Withholding[]>(this.apiUrl+`sales/withold/agent/?agent=${params.agent}&date=0&pageNo=${params.pageNo}&pageSize=${params.pageSize}&search=0`).pipe(
            map((res:any) => res)
          )
        }

        getWitholdReport(param,agent:any,edate:string,pageNo:number,pageSize:number,sdate:string,type:any,unit:any):Observable<Withholding[]>{
          let params = new HttpParams;
          //params = params.append('curr',String(curr));
          params = params.append('agent',agent);
          params = params.append('edate',String(edate));
          params = params.append('pageNo',String(pageNo));
          params = params.append('pageSize',String(pageSize));
          params = params.append('sdate',String(sdate));
          params = params.append('type',type);
          params = params.append('unit',unit);
          const url = `${this.apiUrl}sales/withold/findByWithHoldByBusinessUnit/${param.curr}?${params}`;
          return this.http.post<Withholding[]>(url,{params});
        }

        getWitholdReportByAllAgent(param,edate:string,pageNo:number,pageSize:number,sdate:string,type:any,unit:any):Observable<Withholding[]>{
          let params = new HttpParams;
          //params = params.append('curr',String(curr));
          //params = params.append('agent',agent);
          params = params.append('edate',String(edate));
          params = params.append('pageNo',String(pageNo));
          params = params.append('pageSize',String(pageSize));
          params = params.append('sdate',String(sdate));
          params = params.append('type',type);
          params = params.append('unit',unit);
          const url = `${this.apiUrl}sales/withold/findByWithHoldByBusinessUnit/${param.curr}?${params}`;
          return this.http.post<Withholding[]>(url,{params});
        }

        searchWitholdings(params):Observable<Withholding[]>{
          return this.http.get<Withholding[]>(this.apiUrl+`sales/withold/agent/?agent=${params.agent}&date=0&pageNo=0&pageSize=10&search=${params.search}`)
        }

        searchAllInstitutions(param):Observable<Withholding[]>{
          return this.http.get<Withholding[]>(this.apiUrl+`taxpayer/institutions/all/?pageNo=0&pageSize=10&search=${param.search}`)
        }

        getWithholdingsByRange(param,params):Observable<Withholding[]>{
          const url = `${this.apiUrl}sales/withold/agent/range/?agent=${param.agent}&pageNo=${param.pageNo}&pageSize=${param.pageSize}`;
          return this.http.post<Withholding[]>(url,params);
        }

        getWitholdingsItems(param):Observable<Withholding[]>{
          const url = `${this.apiUrl}sales/sales_items/sales/${param.id}`;
          return this.http.get(url).pipe(map((res: any) => res));
        }

        getById(id: number): Observable<any> {
          const url = `${this.apiUrl}sales/withold/${id}`;
          return this.http.get(url).pipe(map((res: any) => res));
        }
}
