import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseLocationTypeList } from '../domain/dtos/location-type/DtoResponseLocationTypeList';
@Injectable({
  providedIn: 'root'
})
export class LocationTypeService {

  constructor(  
    private http: HttpClient

  ) { }
  list(){
    return this.http.get<DtoResponseLocationTypeList>(`${environment.apiUrl}/location-types/list`)
  }

}
