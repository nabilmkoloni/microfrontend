import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { SalesReport } from '../../models/salesReport/sales-report.model';

@Injectable({
  providedIn: 'root'
})
export class DefaultSalesReportEntityService extends EntityCollectionServiceBase<SalesReport> {
  private apiUrl:string = environment.apiUrl
  constructor(private integrateServiceElementaryFactory:EntityCollectionServiceElementsFactory,private http:HttpClient) { 
    super('Sales_Report',integrateServiceElementaryFactory)
  }
}
