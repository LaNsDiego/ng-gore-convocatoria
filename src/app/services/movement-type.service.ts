import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseMovementTypeList } from '../domain/dtos/movement-type/DtoMovementTypeList';

@Injectable({
  providedIn: 'root'
})
export class MovementTypeService {

  constructor(
    private http: HttpClient
  ) { }
  list(){
    return this.http.get<DtoResponseMovementTypeList>(`${environment.apiUrl}/movement-types/list`)
  }
  listInputMovementType(){
    return this.http.get<DtoResponseMovementTypeList>(`${environment.apiUrl}/movement-types/list-input`)
  }

  listOutputMovementType(){
    return this.http.get<DtoResponseMovementTypeList>(`${environment.apiUrl}/movement-types/list-output`)
  }
}
