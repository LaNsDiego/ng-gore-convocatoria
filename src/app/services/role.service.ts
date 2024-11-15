import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { RoleEntity } from '../domain/entities/RoleEntity';
import { DtoRoleCreate } from '../domain/dtos/role/DtoRoleCreatel';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient,
  ) { }

  list(){
    return this.http.get<RoleEntity[]>(`${environment.apiUrl}/roles/list`)
  }

  store(data : DtoRoleCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/roles/store`,data)
  }
}
