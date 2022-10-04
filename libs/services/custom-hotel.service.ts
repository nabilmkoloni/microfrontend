import { HotelServices } from './../models/hotel-services.model';
import { Accomodation } from './../models/accomodation.model';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpMethods, HttpUrlGenerator } from '@ngrx/data';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomHotelService extends DefaultDataService<Accomodation> {
  private apiUrl:string = environment.apiUrl;

  
  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Hotels',http,httpUrlGenerator)
  }

  add(body: any) {
  return this.http.post<any>( `${this.apiUrl}hotel/hotels/`,body)
  .pipe(
  map((res: any) => (res))
  );
  }

  updateAll(body: any) {
  return this.http.post<any>( `${this.apiUrl}hotel/hotels/all/checkout/`,body)
  .pipe(
  map((res: any) => (res))
  );
  }

  update(body:any):Observable<Accomodation>{
  return this.http.put<Accomodation>(this.apiUrl+`hotel/hotels/single/checkout/${body.id}`,body)
  }
  
  getWithQuery(params:string|any):Observable<Accomodation[]>{
    //return this.http.get<Stock[]>(this.apiUrl+`sales/stock/${params}`)

    const url = `${this.apiUrl}hotel/hotels/unit/${params.id}?${params.size}`;
    return this.http.get(url).pipe(map((res: any) => res=[{...res,id:0}]));
  }

  accommodationList(param,params){
    const url = `${this.apiUrl}hotel/hotels/guest/guest/in/?edate=0&pageNo=${params.size}&pageSize=${params.pageSize}&sdate=0&search=0`
    return this.http.post(url,param).pipe(map((res:any) => res))
  }

  searchAccomodation(params:string|any):Observable<Accomodation[]>{
    const url = `${this.apiUrl}hotel/hotels/guest/unit/${params.id}?date=0&pageNo=${params.size}&pageSize=${params.pageSize}&search=${params.search}`;
    return this.http.get(url).pipe(map((res:any) => res=[{...res,id:0}]));
  }

  getCheckoutList(param,params){
    // const url = `${this.apiUrl}hotel/hotels/unit/out/${params.id}?${params.size}`;
    // return this.http.get(url).pipe(map((res: any) => res=[{...res,id:0}]));
    const url = `${this.apiUrl}hotel/hotels/guest/guest/out/?${params.size}`;
    return this.http.post(url,param).pipe(map((res) => res));
  }

  getCheckoutListSearch(params){
    const url = `${this.apiUrl}hotel/hotels/guest/unit/out/${params.id}?${params.size}`;
    return this.http.get(url).pipe(map((res:any) => res=[{...res,id:0}]));
  }

  expectedcheckoutList(params){
    const url = `${this.apiUrl}hotel/hotels/getListOfGuestToCheckOut?bunit=${params.bunit}&cdate=${params.cdate}&page=${params.page}&size=${params.size}`;
    return this.http.get(url).pipe(map((res:any) => res))
  }
  
  viewCheckoutDetails(params){
    const url = `${this.apiUrl}hotel/accommodation/${parseInt(params.accommodation_id)}`;
    return this.http.get(url).pipe(map((res: any) => res=[{
        fullName:res.accommodation.guest.filter((x:any) => x.id === params.id)[0].fullName,
        country:res.accommodation.guest.filter((x:any) => x.id === params.id)[0].country,
        currency:res.accommodation.currency,
        // name:res.accommodation.room.filter((x:any) => x.id === params.id)[0].name,
        accomodationPrice:res.accommodation.room[0].accomodationPrice
    }]));
  }
//country:res.guest.filter((x:any) => x.id === params.id)[0].country
  getCountries(params:string|any){
    const url = `${this.apiUrl}hotel/country/name/${params}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  reprintCheckoutReport(param){
    const url = `${this.apiUrl}hotel/checkout/guest/?currency=${param.currency}&guest=${param.guest}`
    return this.http.get(url).pipe(map((res: any) => res));
  }

  verifyCheckoutReport(reportNumber){
    const url = `${this.apiUrl}hotel/checkout/report/${reportNumber}`;
    return this.http.get(url).pipe(map((res:any) => res))
  }


  getMostVisitedCountries(params:string|any){
    const url = `${this.apiUrl}hotel/hotels/getMostVisitedGeuestByHotel?BusinessUnit=${params}&page=0&size=10`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  
  getById(id: number): Observable<any> {
    const url = `${this.apiUrl}hotel/hotels/uuid/${id}`;
    return this.http.get(url).pipe(map((res: any) => res));
  }

  changeRoomPrice(params):Observable<any>{
    const url = `${this.apiUrl}hotel/rooms/change/price/${params.room_id}`;
    return this.http.put(url,params).pipe(map((res:any) => res))
  }

  checkGuest(param):Observable<any>{
    const url = `${this.apiUrl}hotel/hotels/guest/${param.documentNo}`;
    return this.http.get(url).pipe(map((res:any) => res=[{checkOut:res.checkOut,fullName:res.fullName}]))
  }

  getCheckOutExpectedGuests(businessUnit:number, checkOutDate:any, pageNo: number, pageSize: number): Observable<any> {
    let params = new HttpParams;

    params = params.append('bunit', String(businessUnit));
    params = params.append('cdate', String(checkOutDate));
    params = params.append('page', String(pageNo));
    params = params.append('size', String(pageSize));

    const url = `${this.apiUrl}hotel/hotels/getListOfGuestToCheckOut`;
    return this.http.get<any>(url, { params });
  }


}