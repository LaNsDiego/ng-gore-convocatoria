import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeasurementUnitEntity } from '../domain/entities/MeasurementUnitEntity';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeasurementUnitService {

  constructor(
    private http: HttpClient
  ) { }
  list(){
    return this.http.get<MeasurementUnitEntity[]>(`${environment.apiUrl}/measurement-units/list`);
  }

}
