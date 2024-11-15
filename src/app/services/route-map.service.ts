import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DtoResponseRouteMapList } from '../domain/dtos/route-map/DtoResponseRouteMapList';

@Injectable({
  providedIn: 'root'
})
export class RouteMapService {

  http = inject(HttpClient)
  constructor() { }


  list(){
    return this.http.get<DtoResponseRouteMapList>(`${environment.apiUrl}/route-maps/list`)
  }

  store(geometry : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/route-maps/store`,geometry)
  }

  delete(route_map_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/route-maps/delete`, { route_map_id })
  }
}
