import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseTraining } from '../domain/dtos/training/DtoResponseTraining';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  http = inject(HttpClient)
  constructor() { }

  list(training_id : number){
    return this.http.get<DtoResponseTraining[]>(`${environment.apiUrl}/training/list/${training_id}`)
  }

  store(values : any){
    const formData = new FormData()
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key])
      }
    }
    values = formData;
    return this.http.post<{message : string}>(`${environment.apiUrl}/training/store`,formData)
  }
}
