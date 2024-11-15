import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoActivityLog } from '../domain/dtos/activity-log/DtoActivityLog';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {

  constructor(
    private http: HttpClient
  ) { }

  getUserActivities(values: DtoActivityLog) {

    return this.http.post<any[]>(`${environment.apiUrl}/activities/user`, values);
  }
}
