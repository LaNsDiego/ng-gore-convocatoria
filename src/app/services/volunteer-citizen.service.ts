import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseVolunteerCitizenList } from '../domain/dtos/volunteer-citizen/DtoResponseVolunteerCitizenList';
import { DtoVolunteerCitizenCreate } from '../domain/dtos/volunteer-citizen/DtoVolunteerCitizenCreate';
import { DtoVolunteerCitizenEdit } from '../domain/dtos/volunteer-citizen/DtoVolunteerCitizenEdit';

@Injectable({
  providedIn: 'root'
})
export class VolunteerCitizenService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseVolunteerCitizenList>(`${environment.apiUrl}/volunteer-citizens/list`)
  }

  store(data:DtoVolunteerCitizenCreate){
    const dataForm = new FormData()
    Object.keys(data).forEach((key: string) => {
      dataForm.append(key, (data as { [key: string]: any })[key]);
    });

    return this.http.post<{message : string}>(`${environment.apiUrl}/volunteer-citizens/store`,dataForm)
  }

  update(data:DtoVolunteerCitizenEdit){
    const dataForm = new FormData()
    Object.keys(data).forEach((key: string) => {
      dataForm.append(key, (data as { [key: string]: any })[key]);
    });
    return this.http.post<{message : string}>(`${environment.apiUrl}/volunteer-citizens/update`,dataForm)
  }
}
