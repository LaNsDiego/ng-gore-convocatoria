import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseJobProfile } from '../domain/dtos/job-profile/DtoResponseJobProfile';

@Injectable({
  providedIn: 'root'
})
export class JobProfileService {


  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseJobProfile[]>(`${environment.apiUrl}/job-profiles/list`)
  }

  store( values : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/job-profiles/store`,values)
  }
  update(values: any ){
    return this.http.post<{message : string}>(`${environment.apiUrl}/job-profiles/update`,values)
  }
  delete(id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/job-profiles/delete`,{id})
  }
}
