import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoEstablishmentCreate } from '../domain/dtos/establishment/DtoEstablishmentCreate';
import { EstablishmentEntity } from '../domain/entities/EstablishmentEntity';
import { DtoResponseEstablishment } from '../domain/dtos/establishment/DtoResponseEstablishment';
import { environment } from '@/environments/environment';
import { DtoEstablishmentEdit } from '../domain/dtos/establishment/DtoEstablishmentEdit';
import { DtoResponseEstablishmentList } from '../domain/dtos/establishment/DtoResponseEstablishmentList';
import { DtoResponseEstablishmentWithKardexList } from '../domain/dtos/establishment/DtoEstablishmentWithKardexList';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(
    private http: HttpClient,
  ) { }

  list(){
    return this.http.get<DtoResponseEstablishmentList>(`${environment.apiUrl}/establishments/list`)
  }
  
  store(values : DtoEstablishmentCreate){
    return this.http.post<{message : string , created : DtoResponseEstablishment}>(`${environment.apiUrl}/establishments/store`, values)
  }

  update(values : DtoEstablishmentEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/establishments/update`, values)
  }

  delete(establishment_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/establishments/delete/`, { establishment_id })
  }

}
