import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DtoRoleHasAccessEdit } from '../domain/dtos/permission/DtoRoleHasAcessEdit';
import { DtoResponseModuleSystemList } from '../domain/dtos/system-module/DtoResponseModuleSystemList';
import { DtoResponseModuleGroupList } from '../domain/dtos/module-group/DtoResponseModuleGroupList';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<any>(`${environment.apiUrl}/permissions/list`)
  }

  update(dtoEdit : DtoRoleHasAccessEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/permissions/update`, dtoEdit)
  }

  listGroupWithModules(){
    return this.http.get<DtoResponseModuleGroupList>(`${environment.apiUrl}/system-modules/list`)
  }

  listByRole(role_id : number){
    return this.http.get<any[]>(`${environment.apiUrl}/permissions/list-by-role/${role_id}`)
  }

  // updatePermissions({added , removed , role_id } : {added : number[] , removed : number[] , role_id : number}){
  updatePermissions({permission_ids, role_id} : { permission_ids : { permission_id: number, has_access: boolean }[] , role_id : number}){
    return this.http.post<{message : string}>(`${environment.apiUrl}/permissions/update-permissions`, { permission_ids , role_id})
  }
}
