import { ApiService } from './../services/api.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatGuard implements CanActivate {
  constructor(readonly auth: ApiService, readonly router: Router) {}

  canActivate() {
    if (!this.auth.currentUser) {
      this.router.navigateByUrl('/login');
      return false;
    }

    return true;
  }
}
