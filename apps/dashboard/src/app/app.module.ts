import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { DefaultDataServiceConfig, EntityDataModule, EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { customDataServiceConfig, entityConfig } from './entity-metadata';
import { CustomTaxpayerService } from '../../../../libs/services/custom-taxpayer.service';
import { CustomSalesService } from '../../../../libs/services/custom-sales.service';
import { CustomUnitsService } from '../../../../libs/services/custom-units.service';
import { DashCardComponent } from './dash-card/dash-card.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from "@angular/material/card";
import { MatSelectModule } from '@angular/material/select';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { DashboardModule } from './dashboard/dashboard.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    DashboardComponent,
    DashCardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    NgxPermissionsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    SwiperModule,
    HttpClientModule,
    DashboardModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DefaultDataServiceConfig,
       useValue: customDataServiceConfig,
    },
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
