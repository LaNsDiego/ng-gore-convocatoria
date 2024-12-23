import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailService {

  http = inject(HttpClient)
  constructor() { }

  listByProjectRequirement(project_requirement_id : number){
    return this.http.get<any[]>(`${environment.apiUrl}/project-requirement-details/list-by-project-requirement/${project_requirement_id}`)
  }

  store(values : any){
    return this.http.post<{ message : string}>(`${environment.apiUrl}/project-requirement-details/store`,values)
  }

  update(values : any){
    return this.http.post<{ message : string}>(`${environment.apiUrl}/project-requirement-details/update`,values)
  }

  delete(id : number){
    return this.http.get<{message:string}>(`${environment.apiUrl}/project-requirement-details/delete/${id}`)
  }
}
