import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseBrandList } from '../domain/dtos/brand/DtoResponseBrandList';
import { environment } from '@/environments/environment';
import { DtoResponseBrand } from '../domain/dtos/brand/DtoResponseBrand';
import { DtoBrandCreate } from '../domain/dtos/brand/DtoBrandCreate';
import { DtoBrandEdit } from '../domain/dtos/brand/DtoBrandEdit';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseBrandList>(`${environment.apiUrl}/brands/list`)
  }

  store(values : DtoBrandCreate){
      return this.http.post<{message : string , created : DtoResponseBrand}>(`${environment.apiUrl}/brands/store`, values)
  }

  // update(values : DtoBrandEdit){
  //     return this.http.post<{message : string , created : DtoResponseBrand}>(`${environment.apiUrl}/brands/update`, values)
  // }
  
  // delete(brand_di : number){
  //   return this.http.post<{message : string}>(`${environment.apiUrl}/brands/delete/`, { brand_di })
  // }
}
