import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseProgramationList } from '../domain/dtos/programation/DtoResponseProgramationList';
import { DtoProgramationCreate } from '../domain/dtos/programation/DtoProgramationCreate';
import { DtoProgramationEdit } from '../domain/dtos/programation/DtoProgramationEdit';

@Injectable({
  providedIn: 'root'
})
export class ProgramationService {

  http = inject(HttpClient)
  constructor() { }


  list(){
    return this.http.get<DtoResponseProgramationList>(`${environment.apiUrl}/programations/list`)
  }

  store(values : DtoProgramationCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/programations/store`,values)
  }

  update(values : DtoProgramationEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/programations/update`,values)
  }

}
