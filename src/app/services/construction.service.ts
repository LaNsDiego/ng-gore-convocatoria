import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseConstruction } from '../domain/dtos/construction/DtoResponseConstruction';
import { DtoResponseConstructionList } from '../domain/dtos/construction/DtoResponseConstructionList';
import { DtoConstructionCreate } from '../domain/dtos/construction/DtoConstructionCreate';
import { DtoConstructionEdit } from '../domain/dtos/construction/DtoConstructionEdit';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseConstructionList>(`${environment.apiUrl}/constructions/list`)
  }

  store(values : DtoConstructionCreate){
      return this.http.post<{message : string , created : DtoResponseConstruction}>(`${environment.apiUrl}/constructions/store`, values)
  }

  update(values : DtoConstructionEdit){
      return this.http.post<{message : string , created : DtoResponseConstruction}>(`${environment.apiUrl}/constructions/update`, values)
  }
  
  delete(construction_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/constructions/delete`, { construction_id })
  }
}
