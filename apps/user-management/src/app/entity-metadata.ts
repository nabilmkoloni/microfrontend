// import { Accomodation } from './modules/TaxpayerPortal/models/accomodation.model';
// import { Measurements } from './modules/TaxpayerPortal/models/measurements.model';
// import { Stock } from './modules/TaxpayerPortal/models/stock.model';
import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from '../environments/environment';

const entityMetadata: EntityMetadataMap = {
  Users:{},

};

const pluralNames = {

};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const customDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl
  //timeout: 3000 //request timeout
}