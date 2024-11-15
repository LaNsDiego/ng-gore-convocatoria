import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoProgramationScheduleCreate } from '../domain/dtos/programation-schedule/DtoProgramationScheduleCreate';
import { DtoResponseRouteMap } from '../domain/dtos/route-map/DtoResponseRouteMap';

@Injectable({
  providedIn: 'root'
})
export class ProgramationScheduleService {


  http = inject(HttpClient)
  constructor() { }


  store(values : DtoProgramationScheduleCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/programation-schedules/store`,values)
  }

  updateMap(values : {programation_schedule_id : number , map_route_id : number}){
    return this.http.post<{message : string}>(`${environment.apiUrl}/programation-schedules/update-map`,values)
  }
}
