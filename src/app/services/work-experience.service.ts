import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseWorkExperience } from '../domain/dtos/work-experience/DtoResponseWorkExperience';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseWorkExperience[]>(`${environment.apiUrl}/work-experiences/list`)
  }

  store(values : any){
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }

    return this.http.post(`${environment.apiUrl}/work-experiences/list`,formData)
  }
}
