import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseFuelConsumptionList } from '../domain/dtos/fuel-consumption/DtoResponseFuelConsumptionList';
import { DtoResponseFuelConsumption } from '../domain/dtos/fuel-consumption/DtoResponseFuelConsumption';
import { DtoFuelConsumptionCreate } from '../domain/dtos/fuel-consumption/DtoFuelConsumptionCreate';
import { environment } from '@/environments/environment';
import { DtoFuelConsumptionEdit } from '../domain/dtos/fuel-consumption/DtoFuelConsumptionEdit';

@Injectable({
  providedIn: 'root'
})
export class FuelConsumptionService  {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseFuelConsumptionList>(`${environment.apiUrl}/fuel-consumptions/list`)
  }

  store(values : DtoFuelConsumptionCreate){
      return this.http.post<{message : string , created : DtoResponseFuelConsumption}>(`${environment.apiUrl}/fuel-consumptions/store`, values)
  }

  update(values : DtoFuelConsumptionEdit){
      return this.http.post<{message : string , created : DtoResponseFuelConsumption}>(`${environment.apiUrl}/fuel-consumptions/update`, values)
  }
  
  delete(fuel_consumption_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/fuel-consumptions/delete/`, { fuel_consumption_id })
  }
}
