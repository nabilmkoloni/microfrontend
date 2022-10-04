import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgxPermissionsModule } from "ngx-permissions";
import { MainLayoutRoutingModule } from "./main-layout-routing.module";



@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        MainLayoutRoutingModule,
        HttpClientModule,
        NgxPermissionsModule.forChild({
          permissionsIsolate: true,
          rolesIsolate: true
        }),
    ]
})
export class MainLayoutModule {}