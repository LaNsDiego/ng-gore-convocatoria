import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseJobTitleList } from '../domain/dtos/job-title/DtoResponseJobTitleList';
import { environment } from '@/environments/environment';
import { DtoResponseJobTitle } from '../domain/dtos/job-title/DtoResponseJobTitle';
import { DtoJobTitleCreate } from '../domain/dtos/job-title/DtoJobTitleCreate';
import { DtoJobTitleEdit } from '../domain/dtos/job-title/DtoJobTitleEdit';
import { JobTitleEntity } from '../domain/entities/JobTitleEntity';
import { JobProfileEntity } from '../domain/entities/JobProfileEntity';

@Injectable({
  providedIn: 'root'
})
export class JobTitleService {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseJobTitleList>(`${environment.apiUrl}/job-titles/list`)
  }

  listWithProfiles(){
    return this.http.get<(JobTitleEntity & { profiles : JobProfileEntity []})[]>(`${environment.apiUrl}/job-titles-sir/list-with-profiles`)
  }

  store(values : DtoJobTitleCreate){
    return this.http.post<{message : string , created : DtoResponseJobTitle}>(`${environment.apiUrl}/job-titles/store`, values)
  }

  update(values : DtoJobTitleEdit){
    return this.http.post<{message : string , created : DtoResponseJobTitle}>(`${environment.apiUrl}/job-titles/update`, values)
  }

  delete(job_title_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/job-titles/delete`, { job_title_id })
  }

  nextCode(){
    return this.http.get<string>(`${environment.apiUrl}/job-titles/next-code`)
  }


}
