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

  update(values : any){
    return this.http.post<{ message : string}>(`${environment.apiUrl}/project-requirement-details/update`,values)
  }
}
