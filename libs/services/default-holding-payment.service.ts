import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { HoldingPayment } from '../models/holding-payment.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultHoldingPaymentService extends EntityCollectionServiceBase<HoldingPayment> {


  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory) { 
    super('Withold_payment',integrateServiceElementaryFactory)
  }



}
