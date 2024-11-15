import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoIncidentEdit } from '../domain/dtos/incident/DtoIncidentEdit';
import { DtoResponseIncidentList } from '../domain/dtos/incident/DtoResponseIncidentList';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  http = inject(HttpClient)
  constructor() { }

  store(data : any){
    const dataForm = new FormData()
    Object.keys(data).forEach((key: string) => {
      if(key === 'photos'){
        console.log(data.photos);
        data.photos.forEach((photo : File) => {
          // dataForm.append('photos[]', (data as { [key: string]: any })[key],);
          dataForm.append('photos[]', photo);
        })
      }else{
        dataForm.append(key, (data as { [key: string]: any })[key]);
      }
    })
    return this.http.post<{message : string}>(`${environment.apiUrl}/incidents/store`,dataForm)
  }

  update(data : DtoIncidentEdit){
    const dataForm = new FormData()
    Object.keys(data).forEach((key: string) => {
      if(key === 'photos'){
        console.log(data.photos);
        data.photos.forEach((photo : File) => {
          dataForm.append('photos[]', photo);
        })
      }else{
        dataForm.append(key, (data as { [key: string]: any })[key]);
      }
    })
    return this.http.post<{message : string}>(`${environment.apiUrl}/incidents/update`,dataForm)
  }

  listByWantedPerson(wanted_person_id : number){
    return this.http.get<DtoResponseIncidentList>(`${environment.apiUrl}/incidents/list-by-wanted-person/${wanted_person_id}`)
  }
}
