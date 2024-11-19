import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  http = inject(HttpClient)
  constructor() { }

  find(document_number : string){
    return this.http.post<{
      message : string,
      person : {first_name : string , father_lastname : string , mother_lastname : string , sex : string},
      exists : boolean
    }>(`${environment.apiUrl}/people/find-sir`,{document_number})
  }
}
