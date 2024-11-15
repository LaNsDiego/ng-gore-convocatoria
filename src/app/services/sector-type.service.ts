import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseSectorTypeList } from '../domain/dtos/sector-type/DtoResponseSectorTypeList';

@Injectable({
  providedIn: 'root'
})
export class SectorTypeService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseSectorTypeList>(`${environment.apiUrl}/sector-types/list`)
  }
}
