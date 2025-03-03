import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {

  http = inject(HttpClient)
  constructor() { }

  listParamsRegimen(){
    return this.http.get<any>(`${environment.apiUrl}/planillas/list-params-regimen`)
  }

  findByProjectReqDetail(project_requirement_detail_id : number){
    return this.http.get<any>(`${environment.apiUrl}/planillas/find-by-project-req-detail/${project_requirement_detail_id}`)
  }

  store(values : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/planillas/store`, values)
  }
}
