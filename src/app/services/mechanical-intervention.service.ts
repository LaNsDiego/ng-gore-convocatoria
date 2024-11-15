import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseMechanicalInterventionList } from '../domain/dtos/mechanical-intervention/DtoResponseMechanicalInterventionList';
import { DtoMechanicalInterventionCreate } from '../domain/dtos/mechanical-intervention/DtoMechanicalInterventionCreate';
import { DtoMechanicalInterventionEdit } from '../domain/dtos/mechanical-intervention/DtoMechanicalInterventionEdit';

@Injectable({
  providedIn: 'root'
})
export class MechanicalInterventionService {

  constructor(
    private http : HttpClient
  ) { }


  list(){
    return this.http.get<DtoResponseMechanicalInterventionList>(`${environment.apiUrl}/mechanical-interventions/list`);
  }

  store(values : DtoMechanicalInterventionCreate){
    return this.http.post<{ message : string}>(`${environment.apiUrl}/mechanical-interventions/store`,values);
  }
  
  update(values : DtoMechanicalInterventionEdit){
    return this.http.post<{ message : string}>(`${environment.apiUrl}/mechanical-interventions/update`,values);
  }

  delete(mechanical_intervention_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/mechanical-interventions/delete/`, { mechanical_intervention_id })
  }
}
