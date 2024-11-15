import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseRoadWayList } from '../domain/dtos/road-way/DtoResponseRoadWayList';
import { environment } from '@/environments/environment';
import { DtoResponseRoadWayCreate } from '../domain/dtos/road-way/DtoResponseRoadWayCreate';

@Injectable({
  providedIn: 'root'
})
export class RoadWayService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseRoadWayList>(`${environment.apiUrl}/road-ways/list`)
  }

  store(values : DtoResponseRoadWayCreate){
    return this.http.post<{ message : string }>(`${environment.apiUrl}/road-ways/store`,values)
  }
  delete(road_way_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/road-ways/delete`, { road_way_id })
  }
}
