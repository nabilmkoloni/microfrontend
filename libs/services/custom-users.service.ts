import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../apps/user-management/src/environments/environment';
import { Usrs } from '../../apps/user-management/src/app/models/usrs.model';

@Injectable({
  providedIn: 'root'
})
export class CustomUsersService  extends DefaultDataService<Usrs> {

  private apiUrl:string = environment.apiUrl;


  constructor(http:HttpClient,httpUrlGenerator:HttpUrlGenerator) { 
    super('Users',http,httpUrlGenerator)
  }
      // add(body: any):Observable<any> {
      //   return this.http.post<any>( `${this.apiUrl}auth/auth/register/taxpayer/user/`,body)
      //   .pipe(
      //  map((res: any) => res = {...res,name: res.item_id.name,unitMeasure:res.item_id.unitMeasure}),
      //  tap(res => {console.log("response from =>", res)})
      //   );
      //   }

          override add(body: any) {
            return this.http
              .post<Usrs>(
            `${this.apiUrl}auth/users/register/taxpayer/user/`,
                body
              )
              .pipe(
                map((res: any) => (res))
              );
          }


          addPermission(id:number,body: any) {
            return this.http
              .post<Usrs>(
            `${this.apiUrl}auth/users/user/permission/${id}`,
                body
              )
              .pipe(
                map((res: any) => (res))
              );
          }

          changePassword(body: any) {
            return this.http
              .post<Usrs>(
            `${this.apiUrl}auth/users/user/password/`,
                body
              )
              .pipe(
                map((res: any) => (res))
              );
          }


          requestCodes(body: any) {
            return this.http
              .post<Usrs>(
            `${this.apiUrl}auth/code/reset/password/otp/`,
                body
              )
              .pipe(
                map((res: any) => (res))
              );
          }

          resetPassword(body: any) {
            return this.http
              .post<Usrs>(
            `${this.apiUrl}auth/users/user/password/admin/`,
                body
              )
              .pipe(
                map((res: any) => (res))
              );
          }

          getCodes(params:string|any):Observable<Usrs[]>{
            //return this.http.get<Stock[]>(this.apiUrl+`sales/stock/${params}`)
            const url = `${this.apiUrl}auth/code/${params.code}`;
            return this.http.get(url).pipe(map((res: any) => res));
          }


           override update(body:any):Observable<Usrs>{
                return this.http.put<Usrs>(this.apiUrl+`auth/users/update/taxpayer/${body.user_id}`,body)
            }


            deactivateUser(id:number,body: any) {
              return this.http
                .post<Usrs>(
              `${this.apiUrl}auth/users/user/unactive/${id}`,
                  body
                )
                .pipe(
                  map((res: any) => (res))
                );
            }

            activateUser(id:number,body: any) {
              return this.http
                .post<Usrs>(
              `${this.apiUrl}auth/users/user/activate/${id}`,
                  body
                )
                .pipe(
                  map((res: any) => (res))
                );
            }

            updateUnit(body: any) {
              return this.http
                .post<Usrs>(
              `${this.apiUrl}auth/users/update/user/unit/`,
                  body
                )
                .pipe(
                  map((res: any) => (res))
                );
            }

            deleteUnit(body: any) {
              return this.http
                .post<Usrs>(
              `${this.apiUrl}auth/users/delete/user/unit/`,
                  body
                )
                .pipe(
                  map((res: any) => (res))
                );
            }
    

                
            override getWithQuery(params:string|any):Observable<Usrs[]>{
              //return this.http.get<Stock[]>(this.apiUrl+`sales/stock/${params}`)

              const url = `${this.apiUrl}auth/register/taxpayer/${params.id}`;
              return this.http.get(url).pipe(map((res: any) => res));
            }

            override getAll() {
              const url = `${this.apiUrl}auth/users/user/`;
              return this.http.get(url).pipe(map((res: any) => res));
            }

            getAllPermissions() {
              const url = `${this.apiUrl}auth/users/permission/`;
              return this.http.get(url).pipe(map((res: any) => res));
            }

      

            getUserByZnumber(id: string): Observable<any> {
              return this.http.get<Usrs[]>(this.apiUrl+`auth/users/user/activity/${id}`)
            }

            getUsersData(id: string): Observable<any> {
              const url = `${this.apiUrl}auth/users/user/activity/${id}`;
              return this.http.get<any>(url).pipe(
                map((res:any,i) => res=res.filter((x:any)  =>  x.permissions.some((row:any) => row.permissionName === "view_taxpayer_notification")))
              )
            }

            override getById(id: string): Observable<any> {
              return this.http.get<Usrs[]>(this.apiUrl+`auth/users/user/${id}`)
            }

            getUsernameById(user_id:number): Observable<any>{
              return this.http.get<any>(this.apiUrl+`auth/users/user/${user_id}`);
            }

            getUsername(username:number): Observable<any>{
              return this.http.get<any>(this.apiUrl+`auth/auth/user/username/${username}`);
            }

            userNotification(params: any):Observable<any>{
              const url = `${this.apiUrl}notification/notification/user/`;
              return this.http.post<any>(url,params).pipe(map((res:any) => res))
            }

            getreceivedMessage(params:any,param:any):Observable<any>{
              const url = `${this.apiUrl}notification/notification/receiver/user/?edate=${params.edate}&pageNo=${params.pageNo}&pageSize=${params.pageSize}&sdate=${params.sdate}&status=${params.status}`;
              return this.http.post<any>(url,param).pipe(map((res:any) => res));
            }

            getreceivedTaxpayerMessage(params:any,param:any):Observable<any>{
              const url = `${this.apiUrl}notification/notification/receiver/taxpayer/?edate=${params.edate}&pageNo=${params.pageNo}&pageSize=${params.pageSize}&sdate=${params.sdate}&status=${params.status}`;
              return this.http.post<any>(url,param).pipe(map((res:any) => res));
            }

            getreceivedMessageFromUnit(params:any,param:any):Observable<any>{
              const url = `${this.apiUrl}notification/notification/receiver/unit/?edate=${params.edate}&pageNo=${params.pageNo}&pageSize=${params.pageSize}&sdate=${params.sdate}&status=${params.status}`;
              return this.http.post<any>(url,param).pipe(map((res:any) => res));
            }

            getSenderMessage(params:any,param:any):Observable<any>{
              const url = `${this.apiUrl}notification/notification/sender/?edate=${params.edate}&pageNo=${params.pageNo}&pageSize=${params.pageSize}&sdate=${params.sdate}&status=${params.status}`;
              return this.http.post<any>(url,param).pipe(map((res:any) => res));
            }

            readNotification(param:any){
              const url = `${this.apiUrl}notification/notification/read/${param.notification_id}`;
              return this.http.post<any>(url,param).pipe(map((res:any) => res));
            }

            sendNotification(params:any,body:any):Observable<any>{
              const url = `${this.apiUrl}notification/notification/reply/${params.notification_id}`;
              return this.http.post<any>(url,body).pipe(map((res:any) => res));
            }

 
    }
