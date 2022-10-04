import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { Devices } from '../models/devices.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultDevicesService extends EntityCollectionServiceBase<Devices> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Devices',integrateServiceElementaryFactory)
  }



}
