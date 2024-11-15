import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DtoResponseTagList } from '../domain/dtos/tag/DtoResponseTagList';
import { DtoTagCreate } from '../domain/dtos/tag/DtoTagCreate';
import { environment } from '@/environments/environment';
import { DtoResponseTag } from '../domain/dtos/tag/DtoResponseTag';

@Injectable({
  providedIn: 'root'
})
export class TagService  {

  constructor(
    private http: HttpClient
  ) { }

  list(){
    return this.http.get<DtoResponseTagList>(`${environment.apiUrl}/tags/list`)
  }

  store(values : DtoTagCreate){
      return this.http.post<{message : string , created : DtoResponseTag}>(`${environment.apiUrl}/tags/store`, values)
  }
}
