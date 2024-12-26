import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcademicTrainingService {

  http = inject(HttpClient)
  constructor() { }

  list(employee_id:number){
    return this.http.get<any[]>(`${environment.apiUrl}/academic-training/list/${employee_id}`)
    // return this.http.get<DtoResponseAcademicTraining[]>(`${environment.apiUrl}/academic-training/list/${employee_id}`)
  }

  store(values : any){
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if(key != 'authorization_certificates'){
          formData.append(key, values[key]);
        }else{
          console.log(`values[${key}]`, values[key]);

          for (let i = 0; i < values[key].length; i++) {
            formData.append('authorization_certificates_certicates[]', values[key][i]['authorization_certificate']);
            formData.append('authorization_certificates_start_dates[]', values[key][i]['authorization_start_date']);
            formData.append('authorization_certificates_end_dates[]', values[key][i]['authorization_end_date']);
            formData.append('authorization_certificates_files[]', values[key][i]['authorization_file']);
          }
        }
      }
    }

    return this.http.post<{message : string}>(`${environment.apiUrl}/academic-training/store`,formData)
  }

  update(values : any){
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if(key != 'authorization_certificates'){
          formData.append(key, values[key]);
        }else{
          console.log(`values[${key}]`, values[key]);

          for (let i = 0; i < values[key].length; i++) {
            formData.append('authorization_certificates_certicates[]', values[key][i]['authorization_certificate']);
            formData.append('authorization_certificates_start_dates[]', values[key][i]['authorization_start_date']);
            formData.append('authorization_certificates_end_dates[]', values[key][i]['authorization_end_date']);
            formData.append('authorization_certificates_files[]', values[key][i]['authorization_file']);
          }
        }
      }
    }

    return this.http.post<{message : string}>(`${environment.apiUrl}/academic-training/update`,formData)
  }

  delete(id : number){
    return this.http.get<{message : string}>(`${environment.apiUrl}/academic-training/delete/${id}`)
  }
}
