import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { InhouseGuests } from '../../models/accomodation.model';
import { Rooms } from '../../models/rooms.model';
import { SalesReport } from '../../models/salesReport/sales-report.model';

@Injectable({
  providedIn: 'root'
})
export class CustomSalesReportDataService  extends DefaultDataService<SalesReport> {

  private apiUrl:string = environment.apiUrl;
  private repos;
  private CACHE_KEY = 'totalItems';

  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Sales_Report',http,httpUrlGenerator)
  }
  


      getSalesReportByUnitId(params):Observable<any>{
        const url = `${this.apiUrl}sales/report/sales/unit/${params.unit}?currency=${params.currency}&date=0&pageNo=${params.number}&pageSize=10&search=0`;
        return this.http.get<any>(url);
      }

      getSalesReportByDate(params):Observable<any>{
        const url = `${this.apiUrl}sales/report/sales/?currency=${params.currency}&date=${params.date}&pageNo=${params.number}&pageSize=10&${params.unit}`;
        return this.http.get<any>(url);
      }

      getSalesReportItemsByDate(params):Observable<any>{
        const url = `${this.apiUrl}sales/report/sales/items/?currency=${params.currency}&date=${params.date}&pageNo=${params.number}&pageSize=10&${params.unit}`;
        return this.http.get<any>(url);
      }

      getSalesReportByUnitIdAndItems(params):Observable<any>{
        const url = `${this.apiUrl}sales/report/sales/items/unit/${params.unit}?currency=${params.currency}&date=0&pageNo=${params.number}&pageSize=10&search=0`;
        return this.http.get<any>(url);
      }

      getItemsReportByAllUnit(param,params):Observable<any[]>{
        const url = `${this.apiUrl}sales/report/sales/items/mgt/range/?currency=${param.currency}&pageNo=${param.number}&pageSize=10&${param.unit}`;
        return this.http.post<any>(url,params);
      }

      getSalesReportByAllUnit(param,params):Observable<any[]>{
        const url = `${this.apiUrl}sales/report/sales/mgt/range/?currency=${param.currency}&pageNo=${param.number}&pageSize=10&${param.unit}`;
        return this.http.post<any>(url,params);
      }

      getAllSalesReportByCurrency(params): Observable<any[]> {
        const url = `${this.apiUrl}sales/report/sales/?currency=${params.currency}&date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{...res}])
        );
      }
      
      getAllSalesReportByCurrencyAndItems(params): Observable<any[]> {
        const url = `${this.apiUrl}sales/report/sales/items/?currency=${params.currency}&date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{...res}])
        );
      } 

      getAllSalesReport(params): Observable<any[]> {
        const url = `${this.apiUrl}sales/report/sales/?date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{...res}])
        );
      }

      getAllSalesReportByItems(params): Observable<any[]> {
        const url = `${this.apiUrl}sales/report/sales/items/?date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{...res}])
        );
      }

      getAllTaxableItems(params):Observable<any[]>{
        const url = `${this.apiUrl}sales/report/sales/items/?date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{
            totalItems:res.totalItems,
            totalTax:res.totalTax,
            totalAmount:res.totalAmount,
            itemsData:res.salesReport.filter((x:any) => x.isTaxable === true)
          }])
        );
      }

      getAllNonTaxableItems(params):Observable<any[]>{
        const url = `${this.apiUrl}sales/report/sales/items/?date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{
            totalItems:res.totalItems,
            totalTax:res.totalTax,
            totalAmount:res.totalAmount,
            itemsData:res.salesReport.filter((x:any) => x.isTaxable === false)
          }])
        );
      }
      

      fetchAllSalesReport(params): Observable<any[]> {
        const url = `${this.apiUrl}sales/report/sales/?currency=${params.currency}&date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{...res}])
        );
      } 

      fetchAllSalesReportByItems(params): Observable<any[]> {
        const url = `${this.apiUrl}sales/report/sales/items/?currency=${params.currency}&date=0&pageNo=${params.number}&pageSize=${params.size}&${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res: any) => res=[{...res}])
        );
      }

      getSalesReportByRange(param,params): Observable<any> {
        const url = `${this.apiUrl}sales/report/sales/range/?currency=${param.currency}&&pageNo=${param.number}&pageSize=10`;
        return this.http.post<any>(url,params);
      }

      getTotalTaxByRange(param,params): Observable<any> {
        const url = `${this.apiUrl}sales/report/sales/range/?currency=${param.currency}&&pageNo=${param.number}&pageSize=10`;
        return this.http.post<any>(url,params);
      }

      getSalesReportByRangeItems(param,params): Observable<any> {
        const url = `${this.apiUrl}sales/report/sales/items/range/?currency=${param.currency}&&pageNo=${param.number}&pageSize=10`;
        return this.http.post<any>(url,params);
      }

      getAllCheckInGuest(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/in/?edate=0&pageNo=${params.number}&pageSize=10&sdate=0&search=0&unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      SummaryAllCheckInGuest(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/in/?edate=${params.edate}&pageNo=${params.number}&pageSize=10&sdate=${params.sdate}&search=0&unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      getCheckInGuestByUnit(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/in/?unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      getCheckInGuestByRange(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/in/?edate=${params.edate}&pageNo=${params.number}&pageSize=10&sdate=${params.sdate}&search=0&unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      getAllCheckOutGuest(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/out/?edate=0&pageNo=${params.number}&pageSize=10&sdate=0&search=0&unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      summaryAllCheckOutGuest(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/specific/in/?edate=${params.edate}&pageNo=${params.number}&pageSize=10&sdate=${params.sdate}&unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      getCheckOutGuestByUnit(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/out/?unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      getCheckOutGuestByRange(params):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/guest/out/?edate=${params.edate}&pageNo=${params.number}&pageSize=10&sdate=${params.sdate}&search=0&unit=${params.unit}`;
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        );
      }

      getSpecificIn(params,param):Observable<any> {
        const url = `${this.apiUrl}hotel/hotels/specific/in/?edate=${params.edate}&pageNo=${params.number}&pageSize=10&sdate=${params.sdate}`;
        return this.http.post<any[]>(url,param).pipe(
          map((res:any) => res)
        );
      }

      // getSpecificFiling(params):Observable<any> {
      //   const url = `${this.apiUrl}hotel/hotels/specific/in/?edate=${params.edate}&pageNo=${params.number}&pageSize=10&sdate=${params.sdate}&unit=${params.unit}`;
      //   return this.http.get<any[]>(url).pipe(
      //     map((res:any) => res=[{...res}])
      //   );
      // }

      exchangeRate():Observable<any>{
        const url = `${this.apiUrl}sales/rate/?pageNo=0&pageSize=10&search=0`
        return this.http.get<any[]>(url).pipe(
          map((res:any) => res=[{...res}])
        )
      }

      getExchangeRates():Observable<any> {
        const url = `${this.apiUrl}sales/rate/max/`;
        return this.http.get<any>(url);
      }

      getUnitsInhouseGuests(units:any, sDate:any, eDate:any, search:string, pageNo:number, pageSize:number): Observable<InhouseGuests> {
        let params = new HttpParams;
    
        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('search', String(search));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
    
        const url = `${this.apiUrl}hotel/hotels/guest/guest/in/`;
        return this.http.post<InhouseGuests>(url, units, { params });
      }
    
      getUnitsGuestsHistory(units:any, sDate:any, eDate:any, pageNo:number, pageSize:number): Observable<InhouseGuests> {
        let params = new HttpParams;
    
        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
    
        const url = `${this.apiUrl}hotel/hotels/guest/specific/in/`;
        return this.http.post<InhouseGuests>(url, units, { params });
      }

      getUnitsGuestsAccomodation(sDate:any, eDate:any, units:any, isCheckout:boolean, qParams:QueryParams): Observable<any> {
        let params = new HttpParams;

        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('unit', String(units));
        params = params.append('isCheckout', String(isCheckout));
    
        const url = `${this.apiUrl}hotel/accommodation/calculateAccommodationByUnit/${ qParams.currency }`;
        return this.http.get<any>(url, { params });
      }

      getUnitsGuestsBedNights(sDate:any, eDate:any, units:any): Observable<any> {
        let params = new HttpParams;

        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('unit', String(units));
    
        const url = `${this.apiUrl}sales/sales/getTotalBedNightByBunit`;
        return this.http.get<any>(url, { params });
      }

      getUnitsGuestsSalesTax(sDate:any, eDate:any, units:any, qParams:QueryParams): Observable<any> {
        let params = new HttpParams;

        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('unit', String(units));
    
        const url = `${this.apiUrl}sales/sales_tax/getTotalTaxByBunit/${ qParams.curr }`;
        return this.http.get<any>(url, { params });
      }

      getUnitsCheckOutGuests(units:any, sDate:any, eDate:any, search:string, pageNo:number, pageSize:number): Observable<InhouseGuests> {
        let params = new HttpParams;
    
        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('search', String(search));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
    
        const url = `${this.apiUrl}hotel/hotels/guest/guest/out/`;
        return this.http.post<InhouseGuests>(url, units, { params });
      }
    
      getUnitsCheckOutGuestsHistory(units:any, sDate:any, eDate:any, pageNo:number, pageSize:number): Observable<InhouseGuests> {
        let params = new HttpParams;
    
        params = params.append('sdate', String(sDate));
        params = params.append('edate', String(eDate));
        params = params.append('pageNo', String(pageNo));
        params = params.append('pageSize', String(pageSize));
    
        const url = `${this.apiUrl}hotel/hotels/guest/specific/out/`;
        return this.http.post<InhouseGuests>(url, units, { params });
      }

      getHotelGuestIn(body: any,params:string|any):Observable<any>{
        return this.http.post<any>(this.apiUrl+`hotel/hotels/guest/guest/in/?edate=0&pageNo=${params.page}&pageSize=${params.size}&sdate=0&search=0
        `, body)
      }

      getHotelGuestInByDate(body: any,params:string|any):Observable<any>{
        return this.http.post<any>(this.apiUrl+`hotel/hotels/guest/guest/in/?edate=${params.edate}&pageNo=${params.page}&pageSize=${params.size}&sdate=${params.sdate}&search=0
        `, body)
      }

      getHotelSpecificIn(body: any,params:string|any):Observable<any>{
        return this.http.post<any>(this.apiUrl+`hotel/hotels/guest/specific/in/?edate=${params.edate}&pageNo=${params.page}&pageSize=${params.size}&sdate=${params.sdate}
        `,body)
      }
      getAccomodationSummury(body: any,params:string|any):Observable<any>{
        return this.http.post<any>(this.apiUrl+`sales/report/accommodation/report/?currency=${params.currency}&edate=${params.edate}&pageNo=${params.page}&pageSize=${params.size}&sdate=${params.sdate}
        `,body)
      }


}
