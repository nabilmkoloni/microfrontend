import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from '../environments/environment';

const entityMetadata: EntityMetadataMap = {
  Units:{},
};

const pluralNames = {
  Units:"taxpayer/units",
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const customDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl
  //timeout: 3000 //request timeout
}