import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseProject } from '../domain/dtos/project/DtoResponseProject';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  http = inject(HttpClient)
  constructor() { }


  list(){
    return this.http.get<DtoResponseProject[]>(`${environment.apiUrl}/project-requirements/list`)
  }

  store(values : any){
    return this.http.post<{message : string , created : DtoResponseProject}>(`${environment.apiUrl}/project-requirements/store`, values)
  }

  update(values : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/project-requirements/update`, values)
  }

  delete(employee_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/project-requirements/delete`, { employee_id })
  }

  realSaldo(val :any){
    return this.http.post<any>(`${environment.apiUrl}/project-requirements/real-saldo`, val)
  }

  freeze(project_id :number){
    return this.http.get<{ message : string}>(`${environment.apiUrl}/project-requirements/freeze/${project_id}`)
  }


  findVFP(values : {functional_sequence : string , specific_expenditure : string}){
    // http://localhost:9000/servicio/test.php?sec=0770&clasif=6.8.1.4.1
    // http://localhost/driversiaf/servicio/test.php?clasif=6.8.1.4.1&sec=0770
    return this.http.get<any>(`http://localhost:9000/servicio/test.php?sec=${values.functional_sequence}&clasif=${values.specific_expenditure}`)
    // return this.http.post<any>(`${environment.apiUrl}/foxpro/find-by-expendspecific-secfunc`,values)
  }
}
