import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseWorkActivity } from '../domain/dtos/work-activity/DtoResponseWorkActivity';
import { DtoResponseWorkActivityList } from '../domain/dtos/work-activity/DtoResponseWorkActivityList';
import { DtoWorkActivityCreate } from '../domain/dtos/work-activity/DtoWorkActivityCreate';
import { DtoWorkActivityEdit } from '../domain/dtos/work-activity/DtoWorkActivityEdit';

@Injectable({
  providedIn: 'root'
})
export class WorkActivityService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseWorkActivityList>(`${environment.apiUrl}/work-activities/list`)
  }

  store(values : DtoWorkActivityCreate){
      return this.http.post<{message : string , created : DtoResponseWorkActivity}>(`${environment.apiUrl}/work-activities/store`, values)
  }

  update(values : DtoWorkActivityEdit){
      return this.http.post<{message : string , created : DtoResponseWorkActivity}>(`${environment.apiUrl}/work-activities/update`, values)
  }
  
  delete(work_activity_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/work-activities/delete/`, { work_activity_id })
  }
}
