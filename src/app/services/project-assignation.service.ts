import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserEntity } from '../domain/entities/UserEntity';

@Injectable({
  providedIn: 'root'
})
export class ProjectAssignationService {

  http = inject(HttpClient)
  constructor() { }

  userList(project_requirement_id : number){
    return this.http.get<UserEntity[]>(`${environment.apiUrl}/project-requirement-assigneds/user-list/${project_requirement_id}`)
  }
  list(project_requirement_id : number){
    return this.http.get<any[]>(`${environment.apiUrl}/project-requirement-assigneds/list-by-project-requirement/${project_requirement_id}`)
  }

  store(data : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/project-requirement-assigneds/store`,{users : data})
  }

  delete(items : any[]){
    return this.http.post<{message:string}>(`${environment.apiUrl}/project-requirement-assigneds/delete`, { items })
  }
}
