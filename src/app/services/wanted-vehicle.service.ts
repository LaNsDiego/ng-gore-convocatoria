import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { WantedVehicleEntity } from '../domain/entities/WantedVehicleEntity';

@Injectable({
  providedIn: 'root'
})
export class WantedVehicleService {

  http = inject(HttpClient)
  constructor() { }

  searchByLicensePlate(license_plate: string){
    return this.http.get<WantedVehicleEntity[]>(`${environment.apiUrl}/wanted-vehicle/search/${license_plate}`)
  }
  existsByLicensePlate(license_plate: string){
    return this.http.get<WantedVehicleEntity|null>(`${environment.apiUrl}/wanted-vehicle/exists/${license_plate}`)
  }

  list(){
    return this.http.get<WantedVehicleEntity[]>(`${environment.apiUrl}/wanted-vehicle/list`)
  }

  store(values : any){
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }
    values = formData;
    return this.http.post<{message:string}>(`${environment.apiUrl}/wanted-vehicle/store`,formData)
  }

  update(values : any){
    return this.http.post<{message:string}>(`${environment.apiUrl}/wanted-vehicle/update`,values)
  }

  delete(id : number){
    return this.http.get<{message : string}>(`${environment.apiUrl}/wanted-vehicle/delete/${id}`)
  }
}
