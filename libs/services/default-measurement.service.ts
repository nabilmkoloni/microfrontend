import { Measurements } from './../models/measurements.model';
import { Devices } from './../models/devices.model';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultMeasurementService extends EntityCollectionServiceBase<Measurements> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Measurements',integrateServiceElementaryFactory)
  }


}
