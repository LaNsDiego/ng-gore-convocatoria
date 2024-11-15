import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  authUrl = "http://localhost:8000/oauth/token"
  http = inject(HttpClient)
  constructor() { }

  generateToken(values : any){
    return this.http.post(this.authUrl, values)
  }
}
