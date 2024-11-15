import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseSectorList } from '../domain/dtos/sector/DtoResponseSectorList';
import { environment } from '@/environments/environment';
import { DtoResponseSector } from '../domain/dtos/sector/DtoResponseSector';
import { DtoSectorCreate } from '../domain/dtos/sector/DtoSectorCreate';
import { DtoSectorEdit } from '../domain/dtos/sector/DtoSectorEdit';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseSectorList>(`${environment.apiUrl}/sectors/list`)
  }
  store(values : DtoSectorCreate){
      return this.http.post<{message : string , created : DtoResponseSector}>(`${environment.apiUrl}/sectors/store`, values)
  }
  update(values : DtoSectorEdit){
      return this.http.post<{message : string , created : DtoResponseSector}>(`${environment.apiUrl}/sectors/update`, values)
  }
  delete(sector_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/sectors/delete/`, { sector_id })
  }

}
