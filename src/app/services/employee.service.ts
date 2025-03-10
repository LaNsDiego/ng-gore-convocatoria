import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeEntity } from '../domain/entities/EmployeeEntity';
import { DtoEmployeeCreate } from '../domain/dtos/employee/DtoEmployeeCreate';
import { DtoResponseEmployee } from '../domain/dtos/employee/DtoResponseEmployee';
import { DtoEmployeeEdit } from '../domain/dtos/employee/DtoEmployeeEdit';
import { DtoResponseEmployeeList } from '../domain/dtos/employee/DtoResponseEmployeeList';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient,
  ) { }

  list(){
    return this.http.get<DtoResponseEmployeeList>(`${environment.apiUrl}/employees/list`)
  }

  store(values : DtoEmployeeCreate){
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, (values as any)[key]);
    })
    return this.http.post<{message : string , created : DtoResponseEmployee}>(`${environment.apiUrl}/employees/store`, formData)
  }

  update(values : DtoEmployeeEdit){
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, (values as any)[key]);
    })
    return this.http.post<{message : string}>(`${environment.apiUrl}/employees/update`, formData)
  }

  delete(employee_id : number){
    return this.http.get<{message : string}>(`${environment.apiUrl}/employees/delete/${employee_id}`)
  }

  getOneById(employee_id : number){
    return this.http.get<DtoResponseEmployee>(`${environment.apiUrl}/employees/getone/${employee_id}`)
  }


}
