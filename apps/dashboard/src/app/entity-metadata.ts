import { Measurements } from '../app/models/measurements.model';
import { Stock } from '../app/models/stock.model';
import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from '../environments/environment';

const entityMetadata: EntityMetadataMap = {

  Sales:{},
  Units:{},
  Taxpayer:{},

};

const pluralNames = {

  Units:"taxpayer/units",
  Taxpayer:'taxpayer/taxpayer',
  Sales:"sales/sales",
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const customDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl
  //timeout: 3000 //request timeout
}