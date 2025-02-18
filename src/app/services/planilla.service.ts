import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {

  http = inject(HttpClient)
  constructor() { }

  listParamsRegimen(){
    return this.http.get<any>(`${environment.apiUrl}/planillas/list-params-regimen`)
  }

  store(values : any){
    return this.http.post<{message : string}>(`${environment.apiUrl}/planillas/store`, values)
  }
}
