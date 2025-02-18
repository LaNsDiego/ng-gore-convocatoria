import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeriodRequirementDetailService {

  http = inject(HttpClient)
  constructor() { }

  list(project_requirement_id : number){
    return this.http.get<any[]>(`${environment.apiUrl}/period-requirement-details/list-by-req-detail/${project_requirement_id}`)
  }

  findByReqDetailId(project_requirement_id : number){
    return this.http.get<any>(`${environment.apiUrl}/period-requirement-details/find-by-req-detail/${project_requirement_id}`)
  }

  store(values : any){
    return this.http.post<{message:string}>(`${environment.apiUrl}/period-requirement-details/store`,values)
  }

  update(values : any){
    return this.http.post<{message:string}>(`${environment.apiUrl}/period-requirement-details/update`,values)
  }

  delete(id : number){
    return this.http.get<{message:string}>(`${environment.apiUrl}/period-requirement-details/delete/${id}`)
  }
}
