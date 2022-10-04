import { Offense } from './../../models/offense.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffenseDataServiceService extends DefaultDataService<Offense> {
  private apiUrl:string = environment.apiUrl+'lottery/';


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Offense',http,httpUrlGenerator)
  }
 
  getOffenseUserDetails(params: any): Observable<Offense[]> {
    const url = `${this.apiUrl}taxpayer/?pageNo=${params.id}&pageSize=${params.size}&search=${params.znumber}`;
    return this.http.get<Offense[]>(url).pipe(
      map((res: any) => res = [{ ...res }])
    );
  }

  getPendingOffense(params: any): Observable<Offense[]> {
    const url = `${this.apiUrl}report/offence/?edate=${params.endDate}&pageNo=${params.id}&pageSize=${params.size}&sdate=${params.startDate}&search=0&taxpayer=${params.taxpayerId}`;
    return this.http.get<Offense[]>(url).pipe(
      map((res: any) => res = [{ ...res }])
    );
  }

  getAllOffences(params: any): Observable<Offense[]> {
    const url = `${this.apiUrl}report/offence/all/?edate=0&pageNo=${params.id}&pageSize=${params.size}&sdate=0&search=0&taxpayer=${params.taxpayerId}`;
    return this.http.get<Offense[]>(url).pipe(
      map((res: any) => res = [{ ...res }])
    );
  }

  getAllOffApproved(params: any): Observable<Offense[]> {
    const url = `${this.apiUrl}report/offence/approved/?edate=${params.endDate}${params.offence}&pageNo=${params.id}&pageSize=${params.size}&sdate=${params.startDate}`;
    return this.http.get<Offense[]>(url).pipe(
      map((res: any) => res = [{ ...res }])
    );
  }

  getAllOffPayed(params: any): Observable<Offense[]> {
    const url = `${this.apiUrl}report/offence/payed/?edate=${params.endDate}${params.offence}&pageNo=${params.id}&pageSize=${params.size}&sdate=${params.startDate}`;
    return this.http.get<Offense[]>(url).pipe(
      map((res: any) => res = [{ ...res }])
    );
  }

  getAllOffRejected(params: any): Observable<Offense[]> {
    const url = `${this.apiUrl}report/offence/rejected/?edate=${params.endDate}${params.offence}&pageNo=${params.id}&pageSize=${params.size}&sdate=${params.startDate}`;
    return this.http.get<Offense[]>(url).pipe(
      map((res: any) => res = [{ ...res }])
    );
  }
  // getAll(): Observable<Categories[]> {
  //   const url = `${this.apiUrl}sales/items_categories/all/`;
  //   return this.http.get<Categories[]>(url).pipe(
  //     map((res: any) => res)
  //   );
  // } 

  //   getWithQuery(params:any):Observable<Items[]>{
  //   return this.http.get<Items[]>(this.apiUrl+`sales/items/category/${params.catId}`)
  // }

}
