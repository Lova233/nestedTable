import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DatastoreService } from '../services/datastore.service';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(
        private user: DatastoreService
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("è ok")
    if (this.user.isLoggedin()) {
      console.log("è ok")
      return true;
    } else {
      console.log("no")
      const link = ['/login/'];
      return false;
    }
  }
}
