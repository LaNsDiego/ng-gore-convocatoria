import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseCampaingList } from '../domain/dtos/campaing/DtoResponseCampaingList';
import { DtoCampaingCreate } from '../domain/dtos/campaing/DtoCampaingCreate';
import { DtoCampaingEdit } from '../domain/dtos/campaing/DtoCampaingEdit';

@Injectable({
  providedIn: 'root'
})
export class CampaingService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseCampaingList>(`${environment.apiUrl}/campaings/list`)
  }

  store(values : DtoCampaingCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/campaings/store`, values)
  }

  update(values : DtoCampaingEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/campaings/update`, values)
  }

  delete( id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/campaings/delete`, {id})
  }
}
