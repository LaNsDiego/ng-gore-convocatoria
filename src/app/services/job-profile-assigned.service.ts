import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobProfileAssignedService {

  http = inject(HttpClient)
  constructor() { }

  listByProject(projectId : number){
    return this.http.get<any[]>(`${environment.apiUrl}/jobtitle-assigned/project/${projectId}`)
  }

  getOneByProjectReqDetail(projectRequirementDetailId : number){
    return this.http.get<any>(`${environment.apiUrl}/jobtitle-assigned/list-by-requirement-detail/${projectRequirementDetailId}`)
    // jobtitle-assigned/list-by-requirement/{requirement_id}
  }

  store(data : any){
    return this.http.post<{message: string}>(`${environment.apiUrl}/jobtitle-assigned/store`,data)
  }
}
