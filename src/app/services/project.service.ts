import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseProject } from '../domain/dtos/project/DtoResponseProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  http = inject(HttpClient)
  constructor() { }


  list(){
    return this.http.get<DtoResponseProject[]>(`${environment.apiUrl}/employees/list`)
  }

  store(values : any){
    return this.http.post<{message : string , created : DtoResponseProject}>(`${environment.apiUrl}/employees/store`, values)
  }

  update(values : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/employees/update`, values)
  }

  delete(employee_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/employees/delete`, { employee_id })
  }

}
