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
    return this.http.post<{message : string , created : DtoResponseEmployee}>(`${environment.apiUrl}/employees/store`, values)
  }

  update(values : DtoEmployeeEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/employees/update`, values)
  }

  delete(employee_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/employees/delete`, { employee_id })
  }

  listManagers(){
    return this.http.get<EmployeeEntity[]>(`${environment.apiUrl}/employees/managers/list`)
  }

  employeesByStablishmentExceptOutput(establishment_id : number){
    return this.http.get<EmployeeEntity[]>(`${environment.apiUrl}/employees/list/establishment-except-output/${establishment_id}`)
  }


  employeesByStablishment(stablishment_id : number){
    return this.http.get<EmployeeEntity[]>(`${environment.apiUrl}/employees/list/by-stablishment/${stablishment_id}`)
  }

  employeesByStablishmentTarget(){
    return this.http.get<EmployeeEntity[]>(`${environment.apiUrl}/employees/list/stablishment-target`)
  }
}
