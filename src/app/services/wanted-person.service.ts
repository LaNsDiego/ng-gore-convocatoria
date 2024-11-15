import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseWantedPersonList } from '../domain/dtos/wanted-person/DtoResponseWantedPersonList';

@Injectable({
  providedIn: 'root'
})
export class WantedPersonService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseWantedPersonList>(`${environment.apiUrl}/wanted-people/list`)
  }

  searchByDNI(dni : string){
    return this.http.get<DtoResponseWantedPersonList>(`${environment.apiUrl}/wanted-people/search/${dni}`)
  }

  store(values : any){
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key])
    }
    return this.http.post<{message : string}>(`${environment.apiUrl}/wanted-people/store`, formData)
  }

  delete(wanted_person_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/wanted-people/delete`, { wanted_person_id })
  }

  getPersonByDNI(dni : string){
    return this.http.get<{
    apcas: string
    apemat :  string
    apepat :  string
    code : number
    dni : string
    fecnac : string
    nombres : string
    ubigeo : string
    }>(`${environment.apiUrl}/wanted-people/person/${dni}`)
  }

  nextCode(){
    return this.http.get<string>(`${environment.apiUrl}/wanted-people/next-incident-code`)
  }
}
