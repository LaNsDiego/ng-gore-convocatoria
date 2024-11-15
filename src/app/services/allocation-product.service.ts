import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseAllocationProductList } from '../domain/dtos/allocation-product/DtoResponseAllocationProductList';
import { DtoProductAllocationCreate } from '../domain/dtos/allocation-product/DtoProductAllocationCreate';

@Injectable({
  providedIn: 'root'
})
export class AllocationProductService {

  http = inject(HttpClient)
  constructor() { }

  list(programation_schedule_id : number){
    return this.http.post<DtoResponseAllocationProductList>(`${environment.apiUrl}/product-allocations/list`,{programation_schedule_id})
  }

  store(values : DtoProductAllocationCreate){
    return this.http.post<{ message : string }>(`${environment.apiUrl}/product-allocations/store`,values)
  }

  
}
