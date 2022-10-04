import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card'
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardComponent } from './card/card.component';
import { MatTableModule } from '@angular/material/table';
import { DefaultDataServiceConfig, EntityDataModule, EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CustomUsersService } from '../../../../libs/services/custom-users.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { customDataServiceConfig, entityConfig } from './entity-metadata';
import { UserManagementModule } from './user-management/user-management.module';

const routes:Routes = [
  {
    path:'',
    loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
  }
];



@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, UserManagementComponent,CardComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    NgxPermissionsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    EntityDataModule.forRoot(entityConfig),
    UserManagementModule
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
      constructor(
    //eds:EntityDefinitionService,
    entityDataService: EntityDataService,
    Users: CustomUsersService,
  ) {
    //eds.registerMetadataMap(entityConfig)
    entityDataService.registerServices({
      Users: Users,
    });
  }
}
