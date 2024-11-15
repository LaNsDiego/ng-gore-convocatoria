import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';
import { DtoResponseProductRentalList } from '../domain/dtos/product-rental/DtoResponseProductRentalList';
import { DtoProductRentalCreate } from '../domain/dtos/product-rental/DtoProductRentalCreate';
import { DtoResponseProductRental } from '../domain/dtos/product-rental/DtoResponseProductRental';
import { DtoProductRentalEdit } from '../domain/dtos/product-rental/DtoProductRentalEdit';
import { EmployeeEntity } from '../domain/entities/EmployeeEntity';

@Injectable({
  providedIn: 'root'
})
export class ProductRentalService  {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseProductRentalList>(`${environment.apiUrl}/product-rentals/list`)
  }

  store(values : DtoProductRentalCreate){
      return this.http.post<{message : string , created : DtoResponseProductRental}>(`${environment.apiUrl}/product-rentals/store`, values)
  }

  update(values : DtoProductRentalEdit){
      return this.http.post<{message : string , created : DtoResponseProductRental}>(`${environment.apiUrl}/product-rentals/update`, values)
  }

  delete(product_rental_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/product-rentals/delete`, { product_rental_id })
  }

  listByEmployeeId(employee_id : number){
    return this.http.post<{employee : EmployeeEntity , product_rentals :DtoResponseProductRentalList}>(`${environment.apiUrl}/product-rentals/list-by-employee`,{employee_id})
  }
}
