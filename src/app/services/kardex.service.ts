import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoKardexCreate } from '../domain/dtos/kardex/DtoKardexCreate';
import { DtoResponseKardexList } from '../domain/dtos/kardex/DtoResponseKardexList';
import { DtoResponseKardex } from '../domain/dtos/kardex/DtoResponseKardex';
import { environment } from '@/environments/environment';
import { DtoKardexEdit } from '../domain/dtos/kardex/DtoKardexEdit';
import { DtoResponseEstablishmentWithKardexList } from '../domain/dtos/establishment/DtoEstablishmentWithKardexList';
import { DtoResponseKardexByEstablishmentList } from '../domain/dtos/kardex/DtoResponseKardexByEstablishmentList';
import { DtoDetailKardexCreate } from '../domain/dtos/detail-kardex/DtoDetailKardexCreate';
import { DtoKardexCreateOutput } from '../domain/dtos/kardex/output/DtoKardexCreateOutput';
import { DtoDetailKardexCreateOutput } from '../domain/dtos/detail-kardex/output/DtoDetailKardexCreateOutput';
import { DtoProductAllocationCreate } from '../domain/dtos/allocation-product/DtoProductAllocationCreate';

@Injectable({
  providedIn: 'root'
})
export class KardexService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseKardexList>(`${environment.apiUrl}/kardex/list`)
  }

  listEstablishment(){
    return this.http.get<DtoResponseEstablishmentWithKardexList>(`${environment.apiUrl}/kardex/list-establishments`)
  }

  listByEstablishment(establishment_id : number){
    return this.http.post<DtoResponseKardexByEstablishmentList>(`${environment.apiUrl}/kardex/list-by-establishments/`, { establishment_id })
  }

  listByEstablishmentTarget(){
    return this.http.get<DtoResponseKardexByEstablishmentList>(`${environment.apiUrl}/kardex/list-by-target`)
  }

  store(values : DtoKardexCreate, details : DtoDetailKardexCreate[]){
      return this.http.post<{message : string , created : DtoResponseKardexByEstablishmentList}>(`${environment.apiUrl}/kardex/store`, {values, details})
  }

  storeOutput(values : DtoProductAllocationCreate){
    return this.http.post<{message : string , created : DtoResponseKardexByEstablishmentList}>(`${environment.apiUrl}/kardex/store-output`, values)
  }


  update(values : DtoKardexEdit){
      return this.http.post<{message : string , created : DtoResponseKardex}>(`${environment.apiUrl}/kardex/update`, values)
  }

  delete(kardex_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/kardex/delete/`, { kardex_id })
  }
}
