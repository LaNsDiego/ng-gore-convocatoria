import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DtoResponseCountry } from '../domain/dtos/country/DtoResponseCountry';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  http = inject(HttpClient)
  constructor() { }

  list(){
    return this.http.get<DtoResponseCountry[]>(`${environment.apiUrl}/countries/list`)
  }
}
