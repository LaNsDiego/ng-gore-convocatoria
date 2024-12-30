import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobTitleSirService {

  http = inject(HttpClient)
  constructor() { }

  listJobTitlesSir(){
    return this.http.get<any[]>(`${environment.apiUrl}/job-titles-sir/list`)
  }
}
