import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StampdutyService {
  private apiUrl = environment.apiUrl
  constructor(private http : HttpClient
    ) { }
    getUnitsByZnumber(id: any): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}taxpayer/units/taxpayer/${id}`)
    }

    getStampDutyReturn(body: any): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}sales/sales/getStampDutyReturn?currency=${body.currency}&edate=${body.edate}&sdate=${body.sdate}`,body)
    }
    getStampVatReturn(body: any): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}sales/sales/getVatReturn?currency=${body.currency}&edate=${body.edate}&sdate=${body.sdate}`,body)
    }
    getTaxpayerIforFromZitax(znumber: any): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}taxpayer/taxpayer/number/${znumber}`)
    }
    getHotelLevyReturn(body: any): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}hotel/accommodation/getHotelLevyReturn?currency=${body.currency}&edate=${body.edate}&sdate=${body.sdate}`,body)
    }

    getTaxpayerInfoFromTRA(tnumber: any): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}sales/tra_tansad/${tnumber}`)
    }
    getTaxpayerPurchasesFromTRA(body: any): Observable<any>{
      return this.http.put<any>(`${this.apiUrl}sales/tra_tansad/0`, body)
    }

    saveReturn(body: any): Observable<any>{
      return this.http.post<any>(`${this.apiUrl}sales/return/`, body)
    }
}
