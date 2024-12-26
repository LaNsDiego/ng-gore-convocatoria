import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationCertificateService {

  http = inject(HttpClient);
  constructor() { }

  listByAcademicTraining(academic_training_id : number){
    return this.http.get<any[]>(`${environment.apiUrl}/authorization-certificates/list-by-academic-training/${academic_training_id}`);
  }

  store(values : any){
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        formData.append(key, values[key]);
      }
    }
    return this.http.post<{message : string}>(`${environment.apiUrl}/authorization-certificates/store`, formData);
  }

  delete(id : number){
    return this.http.get<{message : string}>(`${environment.apiUrl}/authorization-certificates/delete/${id}`);
  }
}
