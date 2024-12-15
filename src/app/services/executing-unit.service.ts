import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExecutingUnitService {


  http = inject(HttpClient)
  constructor() { }


  list(){
    return this.http.get<any[]>(`${environment.apiUrl}/executing-units/list`)
  }
}
