import { Injectable } from '@angular/core';
import { SupplierEntity } from '../domain/entities/SupplierEntity';
import { HttpClient } from '@angular/common/http';
import { DtoResponseSupplier } from '../domain/dtos/supplier/DtoResponseSupplier';
import { environment } from '@/environments/environment';
import { DtoSupplierCreate } from '../domain/dtos/supplier/DtoSupplierCreate';
import { DtoSupplierEdit } from '../domain/dtos/supplier/DtoSupplierEdit';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(
    private http: HttpClient,
  ) { }

  list(){
    return this.http.get<SupplierEntity[]>(`${environment.apiUrl}/suppliers/list`)
  }
  
  store(values : DtoSupplierCreate){
    return this.http.post<{message : string , created : DtoResponseSupplier}>(`${environment.apiUrl}/suppliers/store`, values)
  }

  update(values : DtoSupplierEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/suppliers/update`, values)
  }
  
  delete(supplier_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/suppliers/delete`, { supplier_id })
  }

  fetchManagers(){
    return this.http.get<SupplierEntity[]>(`${environment.apiUrl}/suppliers/managers/list`)
  }
}