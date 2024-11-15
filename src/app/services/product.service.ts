import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseProductList } from '../domain/dtos/product/DtoResponseProductList';
import { DtoResponseProduct } from '../domain/dtos/product/DtoResponseProduct';
import { DtoProductEdit } from '../domain/dtos/product/DtoProductEdit';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor(
    private http: HttpClient
) { }

    list(){
        return this.http.get<DtoResponseProductList>(`${environment.apiUrl}/products/list`)
    }
    listBySerialNumber(){
      return this.http.get<DtoResponseProductList>(`${environment.apiUrl}/products/list-by-serial-number`)
    }
    listBySerialNumberAndEstablishment(establishment_id : number){
      return this.http.post<DtoResponseProductList>(`${environment.apiUrl}/products/list-by-serialnumber-and-establishemnt`, {establishment_id})
    }
    listByEstablishmentAndTag(params : {establishment_id : number, tag : string}) {
      return this.http.get<DtoResponseProductList>(`${environment.apiUrl}/products/establishment/${params.establishment_id}/tag/${params.tag}`)
    }
    listByEstablishment(establishment_id : number){
        return this.http.post<DtoResponseProductList>(`${environment.apiUrl}/products/list-by-establishment`, { establishment_id })
    }
    update(values : DtoProductEdit){
        const formData = new FormData()
        //load values to formData
        Object.keys(values).forEach((key) => {
          //@ts-ignore
          formData.append(key, values[key])
        })

        return this.http.post<{message : string , created : DtoResponseProduct}>(`${environment.apiUrl}/products/update`, formData)
      }

      delete(product_id : number){
        return this.http.post<{message : string}>(`${environment.apiUrl}/products/delete`, { product_id })
      }

    checkSerialNumber(serial_number: string) {
      return this.http.post<{ exists: boolean }>(`${environment.apiUrl}/products/check-serial-number`, { serial_number });
    }

    byEstablishmentAndProductType(params : { establishment_id : number , product_type_id : number }){
        return this.http.get<DtoResponseProductList>(`${environment.apiUrl}/products/establishment/${params.establishment_id}/product-type/${params.product_type_id}`)
    }


    byProductType(product_type_name: string, product_id: number){
      return this.http.post<DtoResponseProductList>(`${environment.apiUrl}/products/by-product-type`, { product_type_name, product_id});
    }

    listVehiclesOnTargetEstablishment(){
      return this.http.get<DtoResponseProductList>(`${environment.apiUrl}/products/vehicles/establishment-target`)
    }
}
