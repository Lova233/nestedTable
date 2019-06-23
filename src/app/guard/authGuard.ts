import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DatastoreService } from '../services/datastore.service';
import { userInfo } from 'os';

@Injectable()
export class AuthguardGuard implements CanActivate {

  constructor(
        private user: DatastoreService,
    ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.user.isLoggedin()
  }
}
