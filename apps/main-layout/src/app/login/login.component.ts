import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import {AuthService} from '@taxpayer-p/shared/auth';
import { DefaultUnitsService } from '../../../../../libs/services/default-units.service';
import { CustomUnitsService } from '../../../../../libs/services/custom-units.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { environment } from '../../environments/environment';
import { HttpErrorResponse} from '@angular/common/http';
import * as $ from "jquery";

@Component({
  selector: 'taxpayer-p-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup
  zNumber: string | undefined
  token: any
  uniOperator: any
  agentName: string | undefined;
  permissionList: any[] = []
  listOfOperators: any[] = []
  allUnits: any[] = []
  userType: any
  loading$: Observable<boolean> | undefined;
  loading: boolean | undefined
  units$: Observable<any[]> | undefined;
  xlarge: boolean | undefined;
  medium: boolean | undefined;
  small: boolean | undefined;
  large: boolean | undefined;
  xsmall: boolean | undefined;
  width: string = '350px'
  height: any
  reloadComp$ = new BehaviorSubject<boolean>(true);

    image = 'data:image/png;base64,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'; 

  constructor( private authService: AuthService,private router:Router,
    private permissionsService: NgxPermissionsService,private zno: CustomUnitsService,
    private units: DefaultUnitsService) {}

  ngOnInit(): void {
    this.loginForm = new UntypedFormGroup({

      username: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required]),


    })

    let x = $(window).width()
    this.dimensions(x)
  }

  resetPassword() {
    const options = {
      width: "30%",
      height: "30%"
    }

    //this.dialog.open(ResetPasswordComponent, options)
  }

  onResize(event:any) {
    let x = event.target.innerWidth;

    if (x >= 1200) {
      $('#test').html('extra large')
      $('#loginBox').width(400)
      $('#username').width(230)
      $('#password').width(230)
      $('#img').width(280)
      $('#img').height(90)
      $('#btnLogin').width(110)
    } else if (x >= 992) {
      $('#test').html('large')
      $('#loginBox').width(320)
      $('#username').width(180)
      $('#password').width(180)
      $('#img').width(220)
      $('#img').height(70)
      $('#btnLogin').width(90)
    } else if (x >= 768) {
      $('#test').html('medium')
      $('#img').width(230)
      $('#img').height(60)
      $('#username').css('padding', '9')
      $('#password').css('padding', '9')
      $('#loginBox').width(290)
      $('#username').width(230)
      $('#password').width(230)
      $('#btnLogin').width(110)
    } else if (x >= 576) {
      $('#test').html('small')
      $('#loginBox').width(300)
      $('#username').width(200)
      $('#password').width(200)
      $('#btnLogin').width(50)
    } else if (x < 576) {
      $('#test').html('extra small')
      $('#img').width(200)
      $('#img').height(60)
      $('#username').css('padding', '6')
      $('#password').css('padding', '6')
      $('#loginBox').width(280)
      $('#username').width(180)
      $('#password').width(180)
      $('#btnLogin').width(50)
    }

  }

  dimensions(x: any) {

    if (x >= 1200) {
      $('#loginBox').width(400)
      $('#username').width(230)
      $('#password').width(230)
      $('#img').width(260)
      $('#img').height(80)
      $('#btnLogin').width(110)
    } else if (x >= 992) {
      $('#loginBox').width(320)
      $('#username').width(180)
      $('#password').width(180)
      $('#img').width(220)
      $('#img').height(70)
      $('#btnLogin').width(90)
    } else if (x >= 768) {
      $('#loginBox').width(420)
      $('#username').width(230)
      $('#password').width(230)
      $('#btnLogin').width(110)
    } else if (x >= 576) {
      $('#loginBox').width(420)
      $('#username').width(230)
      $('#password').width(230)
      $('#btnLogin').width(110)
    } else if (x < 576) {
      $('#test').html('extra small')
      $('#img').width(200)
      $('#img').height(60)
      $('#username').css('padding', '6')
      $('#password').css('padding', '6')
      $('#loginBox').width(280)
      $('#username').width(180)
      $('#password').width(180)
      $('#btnLogin').width(50)
    }

  }

    // ==========================> BEGINNING OF USER CONFIGURATIONS FUNCTION <===================================================
    configurations() {


      // if (type == 'A' || type == 'D' || type == 'G') {
  
      //   return `general/${environment.encode(id)}`
  
      // } else if (type == 'B' || type == 'C' || type == 'E') {
  
  
      //   if (category == 'X') {
  
      //     return `hotel/${environment.encode(id)}`
  
      //   } else if (category == 'Y') {
  
  
      //     localStorage.setItem('parent', parentId)
      //     return `restaDash/${environment.encode(id)}`
  
      //   } else if (category == 'Z') {
  
      //     localStorage.setItem('parent', parentId)
      //     return `othersDash/${environment.encode(id)}`
  
      //   }
      // } else if (type == 'F') {
      //   localStorage.setItem('parent', parentId)
      //   return `othersDash/${environment.encode(id)}`
      // }
    }
    // ==========================> END OF USER CONFIGURATIONS FUNCTION <===================================================

      // ==========================> BEGINNING OF USER LOGIN AND USER CONFIGURATIONS <===================================================
  onClick() {
    
    this.loading = true
    let userInfor = this.loginForm.value.username.replace(/[^A-Z0-9]/ig, "_")
    if (userInfor !== null && this.loginForm.value.password !== null) {
      this.authService.getUserValidity(userInfor).subscribe((res:any) => {


        if (res != null) {
          console.log(res)
          if (res['roles'].length > 0 && res['permissions'].length > 0) {
            for (let index = 0; index < res['permissions'].length; index++) {

              this.permissionList.push(res['permissions'][index]['permissionName'])


            }
            if (res['isActive'] == true && (res['userType'] == 'AGENT' || res['userType'] == 'Taxpayer'
              || res['userType'] == 'User')) {



              this.authService.login(this.loginForm.value).subscribe(res => {
                //console.log('login=>',res)
                this.zNumber = res['User']['activityNumber']
                const instId = parseInt(res['User']['activityNumber']);
                this.uniOperator = res['User']['unit']
                this.token = res;
                localStorage['agent_id'] = this.zNumber;
                this.userType = res['User']['userType']
                localStorage.setItem('userId', res['User'].id)
                localStorage.setItem('unit', JSON.stringify(res['User'].unit))
                this.units.getWithQuery({ id: this.zNumber! })
                this.units$ = this.units.entities$
                this.units$.subscribe((inclusiveUnitData) => {



                  for (let index = 0; index < inclusiveUnitData.length; index++) {
                    this.allUnits.push(inclusiveUnitData[index]['id'])

                  }

                  if (res['access_token'] != null) {


                    localStorage.setItem('print', 'A4')

                    localStorage.setItem('permissions', JSON.stringify(this.permissionList))
                    this.permissionsService.loadPermissions(this.permissionList)
                    localStorage.setItem('znumber', this.zNumber!)
                    localStorage.setItem('token', JSON.stringify(this.token))

                    if (this.userType == 'AGENT') {
                      this.router.navigate(['/dashboard'])
                      this.loading = false
                    } else {

                      this.zno.getTaxpayerInfo({ id: this.zNumber }).subscribe((response: any) => {

                        
                        localStorage.setItem('zitas', JSON.stringify(response))

                        if (this.permissionList.indexOf("view_dashboard") >= 0) {


                          if (this.permissionList.indexOf("navigate_dashboard") >= 0 && this.userType == 'Taxpayer') {

                            // IF USER IS ALL PERMITTED THEN DIRECT THEM IN WITH FULL PERMISSIONS
                            this.router.navigate(['/Taxpayer'])
                            this.loading = false

                          } else {


                            if (this.uniOperator.length >= 1) {

                              for (let index = 0; index < this.uniOperator.length; index++) {

                                if (this.allUnits.indexOf(this.uniOperator[index]['unitId']) >= 0) {
                                  let insideIndex = this.allUnits.indexOf(this.uniOperator[index]['unitId'])


                                  // if (inclusiveUnitData[insideIndex]['type'] === 'A') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'A', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.15, 'name': inclusiveUnitData[insideIndex]['name'] })
                                  // } else if (inclusiveUnitData[insideIndex]['type'] == 'B') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'B', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.15, 'name': inclusiveUnitData[insideIndex]['name'] })
                                  // } else if (inclusiveUnitData[insideIndex]['type'] == 'C') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'C', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.12, 'name': inclusiveUnitData[insideIndex]['name'] })

                                  // } else if (inclusiveUnitData[insideIndex]['type'] == 'D') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'D', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.02, 'name': inclusiveUnitData[insideIndex]['name'] })
                                  // } else if (inclusiveUnitData[insideIndex]['type'] == 'E') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'E', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.12, 'name': inclusiveUnitData[insideIndex]['name'] })
                                  // } else if (inclusiveUnitData[insideIndex]['type'] == 'F') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'F', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.12, 'name': inclusiveUnitData[insideIndex]['name'] })
                                  // }else if (inclusiveUnitData[insideIndex]['type'] == 'G') {
                                  //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'G', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.08, 'name': inclusiveUnitData[insideIndex]['name'] })
                                  // }


                                  if (this.listOfOperators.length == this.uniOperator.length) {

                                    localStorage.setItem('pathcheker', JSON.stringify(this.listOfOperators))
                                    this.permissionList.push('user')
                                    localStorage.setItem('permissions', JSON.stringify(this.permissionList))
                                    this.loading = false
                                    this.router.navigate(['/Taxpayer'])
                                  }
                                }

                              }


                              // IF THEY HAVE BEEN ASSIGNED WITH ONLY ONE UNIT 

                            } else {
                              this.loading = false
                              this.router.navigate(['./'])
                              this.errorMessage('Error!!! permissions problems')
                            }
                          }


                        } else {
                          /*WE HAVE TO SEARCH FOR OPERATOR SIGNED*/
                          // IF THEY HAVE MORE THAN ONE BUSINESS UNIT ASSIGNED

                          if (this.uniOperator.length >= 1) {

                            for (let index = 0; index < this.uniOperator.length; index++) {

                              if (this.allUnits.indexOf(this.uniOperator[index]['unitId']) >= 0) {
                                let insideIndex = this.allUnits.indexOf(this.uniOperator[index]['unitId'])


                                // if (inclusiveUnitData[insideIndex]['type'] === 'A') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'A', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.15, 'name': inclusiveUnitData[insideIndex]['name'] })
                                // } else if (inclusiveUnitData[insideIndex]['type'] == 'B') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'B', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.15, 'name': inclusiveUnitData[insideIndex]['name'] })
                                // } else if (inclusiveUnitData[insideIndex]['type'] == 'C') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'C', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.12, 'name': inclusiveUnitData[insideIndex]['name'] })

                                // } else if (inclusiveUnitData[insideIndex]['type'] == 'D') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'D', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.02, 'name': inclusiveUnitData[insideIndex]['name'] })
                                // } else if (inclusiveUnitData[insideIndex]['type'] == 'E') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'E', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.12, 'name': inclusiveUnitData[insideIndex]['name'] })
                                // } else if (inclusiveUnitData[insideIndex]['type'] == 'F') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'F', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.12, 'name': inclusiveUnitData[insideIndex]['name'] })
                                // }else if (inclusiveUnitData[insideIndex]['type'] == 'G') {
                                //   this.listOfOperators.push({ 'id': this.uniOperator[index]['unitId'], 'street': inclusiveUnitData[insideIndex]['street'], 'type': 'G', 'path': `${this.configurations(inclusiveUnitData[insideIndex])}`, 'Tax': 0.08, 'name': inclusiveUnitData[insideIndex]['name'] })
                                // }


                                if (this.listOfOperators.length == this.uniOperator.length) {

                                  localStorage.setItem('pathcheker', JSON.stringify(this.listOfOperators))
                                  this.permissionList.push('homepage')
                                  this.permissionList.push('user')
                                  localStorage.setItem('permissions', JSON.stringify(this.permissionList))
                                  this.loading = false
                                  this.router.navigate(['/Taxpayer'])
                                }
                              }

                            }


                            // IF THEY HAVE BEEN ASSIGNED WITH ONLY ONE UNIT 

                          } else {
                            this.loading = false
                            this.router.navigate(['./'])
                            this.errorMessage('Error!!! permissions problems')
                            //NOTHIG TO DO
                          }


                        }

                      }, (error: HttpErrorResponse) => {

                      })
                    }

                  } else {
                    this.loading = false
                    this.errorMessage('Error!!! undefined access')
                  }
                }, (error) => {
                  this.loading = false
                  this.errorMessage('Error!!! network error, try again')
                })
              }, (error: HttpErrorResponse) => {
                this.loading = false
                this.errorMessage('Error!!! wrong username or password')
              });
            } else {
              this.loading = false
              this.errorMessage('Error!!! User is not Active')
            }
                      } else {
                          this.loading = false
                          this.errorMessage('Error!!! undefined access')
                        }
        } else {
          this.loading = false
          this.errorMessage('Wrong username or password')
        }

      }, (error: HttpErrorResponse) => {
        this.loading = false
        this.errorMessage('Error!!! network error, try again')
      })
    } else {
      this.loading = false
      $('#username').css('border', '3px solid red')
      $('#password').css('border', '3px solid red')
    }
  }

    // ==========================> END OF LOGIN AND USER CONFIGURATIONS <===================================================
    errorMessage(id:any) {
      setTimeout(function () { $("#hideDiv").fadeOut(1500); }, 5000)
      $('#error').html(`${id}`)
      $('#hideDiv').show()
    }
  
    onUsername(data:Event) {
      $('#username').css('border', '1px solid white')
    }
  
    onPassword(data:Event) {
      $('#password').css('border', '1px solid white')
    }
}
