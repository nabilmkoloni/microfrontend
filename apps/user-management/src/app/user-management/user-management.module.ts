import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import {MatDialogModule} from "@angular/material/dialog";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    UserManagementRoutingModule
  ],
  providers:[]
})
export class UserManagementModule {

 }
