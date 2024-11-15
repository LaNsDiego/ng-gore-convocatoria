import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseLandfill } from '../domain/dtos/landfill/DtoResponseLandfill';
import { DtoResponseLandfillList } from '../domain/dtos/landfill/DtoResponseLandfillList';
import { DtoLandfillCreate } from '../domain/dtos/landfill/DtoLandfillCreate';
import { DtoLandfillEdit } from '../domain/dtos/landfill/DtoLandfillEdit';

@Injectable({
  providedIn: 'root'
})
export class LandfillService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseLandfillList>(`${environment.apiUrl}/landfills/list`)
  }

  store(values : DtoLandfillCreate){
      return this.http.post<{message : string , created : DtoResponseLandfill}>(`${environment.apiUrl}/landfills/store`, values)
  }

  update(values : DtoLandfillEdit){
      return this.http.post<{message : string , created : DtoResponseLandfill}>(`${environment.apiUrl}/landfills/update`, values)
  }
  
  delete(landfill_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/landfills/delete/`, { landfill_id })
  }
}
