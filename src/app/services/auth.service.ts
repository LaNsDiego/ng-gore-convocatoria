import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { DtoResponseJWT } from '../domain/dtos/DtoResponseJWT';
import { environment } from '@/environments/environment';
import { Router } from '@angular/router';
import { AuthStore } from '../stores/AuthStore';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStore = inject(AuthStore)
  http = inject(HttpClient)
  router = inject(Router)


  constructor() {
    this.authStore.updateIsAuthenticated(this.authStore.isLoggedIn())
  }

  login(credentials :{email: string, password: string}) {
    return this.http.post<DtoResponseJWT>(`${environment.apiUrl}/verify/login`, credentials)
  }

  logout() {
    localStorage.removeItem('permissions')
    this.authStore.removeJWT()
    this.authStore.updateIsAuthenticated(this.authStore.isLoggedIn())
    this.router.navigate([''],{replaceUrl:true})
  }
}
