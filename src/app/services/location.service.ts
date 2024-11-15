import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { DtoLocationCreate } from '../domain/dtos/location/DtoLocationCreate';
import { DtoResponseLocationList } from '../domain/dtos/location/DtoResponseLocationList';
import { DtoResponseLocation } from '../domain/dtos/location/DtoResponseLocation';
import { DtoLocationEdit } from '../domain/dtos/location/DtoLocationEdit';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseLocationList>(`${environment.apiUrl}/locations/list`)
  }

  store(values : DtoLocationCreate){
      return this.http.post<{message : string , created : DtoResponseLocation}>(`${environment.apiUrl}/locations/store`, values)
  }

  update(values : DtoLocationEdit){
      return this.http.post<{message : string , created : DtoResponseLocation}>(`${environment.apiUrl}/locations/update`, values)
  }

  delete(location_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/locations/delete/`, { location_id })
  }

  byLocationType(location_type_name: string){
    return this.http.post<DtoResponseLocationList>(`${environment.apiUrl}/locations/by-location-type/`, { location_type_name});
  }
}
