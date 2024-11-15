import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/AuthStore';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore)
  const router = inject(Router)
  if(!authStore.isLoggedIn()){
    router.navigate([''],{replaceUrl:true})
  }
  return true
};
