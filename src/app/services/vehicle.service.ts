import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseProductList } from '../domain/dtos/product/DtoResponseProductList';
import { environment } from '@/environments/environment';
import { DtoProductEdit } from '../domain/dtos/product/DtoProductEdit';
import { DtoResponseProduct } from '../domain/dtos/product/DtoResponseProduct';
import { DtoKardexCreateVehicle } from '../domain/dtos/kardex/DtoKardexCreateVehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseProductList>(`${environment.apiUrl}/products/vehicles/establishment-target`)
  }

  update(values : DtoProductEdit){
    const formData = new FormData()
    //load values to formData
    Object.keys(values).forEach((key) => {
      //@ts-ignore
      formData.append(key, values[key])
    })

    return this.http.post<{message : string , created : DtoResponseProduct}>(`${environment.apiUrl}/products/vehicles/update`, formData)
  }

  storeWithKardex(values : DtoKardexCreateVehicle){
    const formData = new FormData()
    //load values to formData
    Object.keys(values).forEach((key) => {
      //@ts-ignore
      formData.append(key, values[key])
    })
    return this.http.post<{message : string }>(`${environment.apiUrl}/kardex/vehicles/store`, formData)
  }


}
