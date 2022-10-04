import { Institution, Institutions } from '../../apps/dashboard/src/app/models/institutions.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from '../../apps/main-layout/src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomInstitutionsService extends DefaultDataService<Institutions> {
      private apiUrl:string = environment.apiUrl;
      reloadComp$: any;


      constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
        super('Institutions',http,httpUrlGenerator)
      }
      
      override add(body: any) {
        return this.http.post<any>( `${this.apiUrl}taxpayer/institutions`,body)
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


      override getAll(): Observable<Institutions[]> {
        const url = `${this.apiUrl}taxpayer/institutions/`;
        return this.http.get<Institutions[]>(url).pipe(
          map((res: any) => res)
        );
      }

      getAllInst(params: string):Observable<Institutions[]> {
        const url = `${this.apiUrl}taxpayer/institutions/all/?pageNo=0&pageSize=10&search=${params.search}`;
        return this.http.get<Institutions[]>(url).pipe(
          map((res:any) => res)
        );
      }
      
      getInstitutionById(institution_id: any):Observable<Institutions[]>{
        const url = `${this.apiUrl}taxpayer/institutions/${institution_id}`;
        return this.http.get<Institutions[]>(url).pipe(
          map((res:any) => res)
        );
      }

      getAgentId(code: any):Observable<Institutions[]>{
        const url = `${this.apiUrl}taxpayer/institutions/institute/${code}`;
        return this.http.get<Institutions[]>(url).pipe(
          map((res:any) => res)
        )
      }

      getAgentByName(name: any):Observable<Institutions[]>{
        const url = `${this.apiUrl}taxpayer/institutions/name/${name}`;
        return this.http.get<Institutions[]>(url).pipe(
          map((res:any) => res)
        )
      }
    
    
      override getWithQuery(params:string):Observable<Institutions[]>{
        return this.http.get<Institutions[]>(this.apiUrl+`/${params}`)
      }

      getAllInstitutions(): Observable<Institution> {
        const url = `${this.apiUrl}taxpayer/institutions/`;
        return this.http.get<Institution>(url);
      }

}
