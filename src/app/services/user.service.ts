import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { DtoResponseUserList } from '../domain/dtos/user/DtoResponseUserList';
import { DtoResponseUser } from '../domain/dtos/user/DtoResponseUser';
import { DtoUserCreate } from '../domain/dtos/user/DtoUserCreate';
import { DtoUserEdit } from '../domain/dtos/user/DtoUserEdit';
import { DtoResponseProfile } from '../domain/dtos/user/DtoResponserProfile';
import { DtoUserEditPassword } from '../domain/dtos/user/DtoUserEditPassword';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  list(){
    return this.http.get<DtoResponseUserList>(`${environment.apiUrl}/users/list`)
  }
  searchByUserId(user_id : number){
    return this.http.get<DtoResponseProfile>(`${environment.apiUrl}/users/search/${user_id}`)
  }

  store(values : any){
    return this.http.post<{message : string , created : DtoResponseUser}>(`${environment.apiUrl}/users/store`, values)
  }

  update(values : DtoUserEdit){
    return this.http.post<{message : string}>(`${environment.apiUrl}/users/update`, values)
  }

  updatePassword(values : DtoUserEditPassword){
    return this.http.post<{message : string}>(`${environment.apiUrl}/users/update-password`, values)
  }

  delete(user_id : number){
    return this.http.post<{message : string}>(`${environment.apiUrl}/users/delete`, { user_id })
  }
}
