import { Usrs } from '../../apps/user-management/src/app/models/usrs.model';

import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from '../../apps/user-management/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DefaultUsersService extends EntityCollectionServiceBase<Usrs> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Users',integrateServiceElementaryFactory)
  }

}
