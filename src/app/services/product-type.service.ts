import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseProductType } from '../domain/dtos/product-type/DtoResponseProductType';
import { DtoResponseProductTypeList } from '../domain/dtos/product-type/DtoResponseProductTypeList';
import { DtoProductTypeCreate } from '../domain/dtos/product-type/DtoProductTypeCreate';
import { DtoProductTypeEdit } from '../domain/dtos/product-type/DtoProductTypeEdit';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService  {

  constructor(
    private http: HttpClient
) { }

    list(){
        return this.http.get<DtoResponseProductTypeList>(`${environment.apiUrl}/product-types/list`)
    }

    listWithoutVehicleTag(){
        return this.http.get<DtoResponseProductTypeList>(`${environment.apiUrl}/product-types/list-without-vehicle-tag`)
    }

    listWithVehicleTag(){
      return this.http.get<DtoResponseProductTypeList>(`${environment.apiUrl}/product-types/list-with-vehicle-tag`)
  }

    store(values : DtoProductTypeCreate){
        const formData = new FormData()
        //load values to formData
        Object.keys(values).forEach((key) => {
            //@ts-ignore
            formData.append(key, values[key])
        })
        return this.http.post<{message : string , created : DtoResponseProductType}>(`${environment.apiUrl}/product-types/store`, formData)
    }

    update(values : DtoProductTypeEdit){
        const formData = new FormData()
        //load values to formData
        Object.keys(values).forEach((key) => {
            //@ts-ignore
            formData.append(key, values[key])
        })

        return this.http.post<{message : string , created : DtoResponseProductType}>(`${environment.apiUrl}/product-types/update`, formData)
    }

    delete(product_type_id : number){
        return this.http.post<{message : string}>(`${environment.apiUrl}/product-types/delete/`, { product_type_id })
    }
}
