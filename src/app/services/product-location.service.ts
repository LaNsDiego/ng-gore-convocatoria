import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseProductLocationList } from '../domain/dtos/product-location/DtoResponseContainerLocationList';
import { environment } from '@/environments/environment';
import { DtoProductLocationCreate } from '../domain/dtos/product-location/DtoProductLocationCreate';
import { DtoResponseProductLocation } from '../domain/dtos/product-location/DtoResponseProductLocation';
import { DtoProductLocationEdit } from '../domain/dtos/product-location/DtoProductLocationEdit';

@Injectable({
  providedIn: 'root'
})
export class ProductLocationService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseProductLocationList>(`${environment.apiUrl}/container-locations/list`)
  }

  store(values : DtoProductLocationCreate){
      return this.http.post<{message : string , created : DtoResponseProductLocation}>(`${environment.apiUrl}/product-locations/store`, values)
  }

  update(values : DtoProductLocationEdit){
      return this.http.post<{message : string , created : DtoResponseProductLocation}>(`${environment.apiUrl}/product-locations/update`, values)
  }
  
  delete(location_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/product-locations/delete/`, { location_id })
  }

  
  byLocationType(location_type: string){
    return this.http.post<DtoResponseProductLocationList>(`${environment.apiUrl}/product-locations/by-location-type`, { location_type })
  }
}
