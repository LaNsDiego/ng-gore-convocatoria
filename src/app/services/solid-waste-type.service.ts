import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseSolidWasteTypeList } from '../domain/dtos/solid-waste-type/DtoResponseSolidWasteTypeList';
import { DtoSolidWasteTypeCreate } from '../domain/dtos/solid-waste-type/DtoSolidWasteTypeCreate';

@Injectable({
  providedIn: 'root'
})
export class SolidWasteTypeService {

  http = inject(HttpClient)
  constructor() { }

  list() {
    return this.http.get<DtoResponseSolidWasteTypeList>(`${environment.apiUrl}/solid-waste-types/list`)
  }

  store(values : DtoSolidWasteTypeCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/solid-waste-types/store`, values)
  }

  update(values: DtoSolidWasteTypeCreate){
    return this.http.post<{message : string}>(`${environment.apiUrl}/solid-waste-types/update`, values)
  }
}
