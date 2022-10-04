import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CustomTaxpayerService } from '@taxpayer-p/shared/auth';
import { HttpClientModule } from '@angular/common/http';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { CustomSalesService } from 'libs/services/custom-sales.service';
import { CustomUnitsService } from 'libs/services/custom-units.service';

const entityMetadata: EntityMetadataMap = {
  Taxpayer:{
      entityDispatcherOptions:{
          //not depend on success of htpp request
          optimisticUpdate:true,
          optimisticDelete:false //default is true
      }
  },
  Units:{
    entityDispatcherOptions:{
        //not depend on success of htpp request
        optimisticUpdate:true,
        optimisticDelete:false //default is true
    }
},
Sales:{
  entityDispatcherOptions:{
      //not depend on success of htpp request
      optimisticUpdate:true,
      optimisticDelete:false //default is true
  }
},

}


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule,
    HttpClientModule,
    NgxPermissionsModule.forChild({
      permissionsIsolate: true,
      rolesIsolate: true
    }),
  ],
  providers:[CustomUnitsService,CustomTaxpayerService,CustomSalesService]
})
export class DashboardModule {
  // constructor(
  //   //eds:EntityDefinitionService,
  //   entityDataService: EntityDataService,
  //   BusinessUnit: CustomUnitsService,
  //   Taxpayer: CustomTaxpayerService,
  //   Sale: CustomSalesService
  // ) {
  //   //eds.registerMetadataMap(entityMetadata)
  //   entityDataService.registerServices({
  //     Units: BusinessUnit,
  //     Taxpayer: Taxpayer,
  //     Sales: Sale,
  //   });
  // }
 }
