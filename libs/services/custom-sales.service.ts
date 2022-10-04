import { ItemsSalesReport, Sales, SalesReport } from '../../apps/dashboard/src/app/models/sales.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { environment } from '../../apps/main-layout/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomSalesService extends DefaultDataService<Sales> {
      private apiUrl:string = environment.apiUrl;
      
      constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
        super('Sales',http,httpUrlGenerator)
      }

      override add(body: any) {
     
        return this.http
          .post<Sales>(
          `${ this.apiUrl}sales/sales/`,
            body
          )
          .pipe(
            map((res: any) => (res))
          );
      }

      addInventory(body: any) {
     
        return this.http
          .post<Sales>(
          `${ this.apiUrl}sales/sales/inventory/`,
            body
          )
          .pipe(
            map((res: any) => (res))
          );
      }

      OverallSales(body: any,params: { currency: any; }) {
        return this.http
          .post<Sales>(
          `${ this.apiUrl}sales/sales/getBussnessUnitDailySales/${params.currency}`,body)
          
          .pipe(
            map((res: any) => (res))
          );
      }
      
      monthlySales(body: any,params: { currency: any; }) {
        return this.http
          .post<Sales>(
          `${ this.apiUrl}sales/sales/getBussnessunitMonthlySale/${params.currency}`,
            body
          )
          .pipe(
            map((res: any) => (res))
          );
      }

      verifyLotteryReceipt(receiptNumber: any){
        const url = `${this.apiUrl}sales/sales_receipt/receipt_number/${receiptNumber}`;
        return this.http.get(url).pipe(map((res:any) => res));
      }

      chechPhoneNumberOnLottery(param: any){
        const url = `${this.apiUrl}lottery/lottery/new/`;
        return this.http.post(url,param).pipe(map((res:any) => res));
      }

      getLotteryId(phone_number: any){
        const url = `${this.apiUrl}lottery/lottery/number/${phone_number}`;
        return this.http.get(url).pipe(map((res:any) => res))
      }

      playLottery(body: any){
        const url = `${this.apiUrl}lottery/entry/new/`;
        return this.http.post(url,body).pipe(map((res:any) => res));
      }

      verifyReceipt(receiptNumber: any){
        const url = `${this.apiUrl}sales/sales_detail/receipt/${receiptNumber}`;
        return this.http.get(url).pipe(map((res:any) => res));
      }

      getTaxpayerData(unit: any){
        const url = `${this.apiUrl}taxpayer/units/sales/taxpayer/?pageNo=0&pageSize=10&unit=${unit}`;
        return this.http.get(url).pipe(map((res:any)=> res));
      }

      getTaxpayerInfo(unit: any){
        const url = `${this.apiUrl}taxpayer/units/unit2/${unit}`;
        return this.http.get(url).pipe(map((res:any)=> res));
      }

      yearlySales(body: any,params: { currency: any; }) {
        return this.http
          .post<Sales>(
          `${ this.apiUrl}sales/sales/getBussnessUnitEachMonthSales/${params.currency}`,
            body
          )
          .pipe(
            map((res: any) => (res))
          );
      }

      salesTodate(body: any,params: { currency: any; }) {
        return this.http
          .post<Sales>(
          `${ this.apiUrl}sales/sales/getBussnessUnitSalesToDate/${params.currency}`,
            body
          )
          .pipe(
            map((res: any) => (res))
          );
      } 
      
      override getWithQuery(params:string|any):Observable<any[]>{
        const url = `${this.apiUrl}sales/sales_items/sales/${params.id}`;
        return this.http.get(url).pipe(map((res: any,index) => res));
      }

      getWithQueryReprint(params:string|any):Observable<any[]>{
        const url = `${this.apiUrl}sales/sales_items/reprint/${params.id}`;
        return this.http.get(url).pipe(map((res: any,index) => res));
      }

      getReprintNumber(params:string|any):Observable<any[]>{
        const url = `${this.apiUrl}sales/sales_items/getNumberOfReprint/${params.id}`;
        return this.http.get(url).pipe(map((res: any,index) => res=[{countReprint:res.countReprint+1}]));
      }

      override getById(id: string): Observable<Sales> {
        const url = `${this.apiUrl}sales/sales/salesByBusinessUnit/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

      getRateBySalesId(id: number): Observable<Sales> {
        const url = `${this.apiUrl}sales/rate/sales/${id}`;
        return this.http.get(url).pipe(map((res: any) => res));
      }

      getRelief(body: any){
        return this.http.post<Sales>(`${this.apiUrl}sales/relief/fetch/sales/`,body)
        .pipe(map((res:any) => (res)));
      }

      saveReleif(body: any){
        return this.http.post<Sales>(`${this.apiUrl}sales/sales/special/relief/`,body)
        .pipe(map((res:any) => (res)));
      }
    
      getUnitsSales(currency: string, date: string, pageNo: number, pageSize: number, search: string, un: any): Observable<SalesReport> {
        let params = new HttpParams;
    
        params = params.append('currency', String(currency));
        params = params.append('date', String(date));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
        params = params.append('search', String(search));
        params = params.append('un', un);
    
        const url = `${this.apiUrl}sales/report/sales/`;
        return this.http.get<SalesReport>(url, { params });
      }
    
      getUnitsSalesByRange(currency: string, date: any, pageNo: number, pageSize: number, un: any): Observable<SalesReport> {
        let params = new HttpParams;
    
        params = params.append('currency', String(currency));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
        params = params.append('un', un);
    
        const url = `${this.apiUrl}sales/report/sales/mgt/range/`;
        return this.http.post<SalesReport>(url, date, { params });
      }

      getUnitsSalesItems(currency: string, date: string, pageNo: number, pageSize: number, search: string, un: any): Observable<ItemsSalesReport> {
        let params = new HttpParams;
    
        params = params.append('currency', String(currency));
        params = params.append('date', String(date));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
        params = params.append('search', String(search));
        params = params.append('un', un);
    
        const url = `${this.apiUrl}sales/report/sales/items/`;
        return this.http.get<ItemsSalesReport>(url, { params });
      }

      getUnitsSalesItemsByStatus(body:any, currency: string, sdate:any, edate:any, status:any, pageNo: number, pageSize: number): Observable<ItemsSalesReport> {
        let params = new HttpParams;
    
        params = params.append('currency', String(currency));
        params = params.append('sdate', String(sdate));
        params = params.append('edate', String(edate));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
        params = params.append('status', String(status));
    
        const url = `${this.apiUrl}sales/report/sales/items/status/`;
        return this.http.post<ItemsSalesReport>(url, body, { params });
      }
    
      getUnitsSalesItemsByRange(currency: string, date: any, pageNo: number, pageSize: number, un: any): Observable<ItemsSalesReport> {
        let params = new HttpParams;
    
        params = params.append('currency', String(currency));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
        params = params.append('un', un);
    
        const url = `${this.apiUrl}sales/report/sales/items/mgt/range/`;
        return this.http.post<ItemsSalesReport>(url, date, { params });
      }

      getSalesSummary(units:any, sDate: any, eDate:any,qParams:QueryParams): Observable<any> {
        let params = new HttpParams;
    
        params = params.append('bu', units);
        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
    
        const url = `${this.apiUrl}sales/sales/getSalesSummery/${qParams['curr']}`;
        return this.http.get<any>(url, { params });
      }

      getPurchases(params:any): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + `sales/btob/purchase/?edate=${params.edate}&pageNo=${params.pageNo}&pageSize=${params.size}&sdate=${params.sdate}&zNumber=${params.znumber}`)
          .pipe(map((res) =>  res ));
      }


}
