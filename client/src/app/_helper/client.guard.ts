import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  userSession: any;
  constructor(private router: Router, private global: GlobalService ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.userSession = this.global.getcurrentUser();
      if (!this.userSession || this.userSession?.role === 'buyer') { return true; }
      this.global.redirect('');
      return false;
      this.global.redirect('');
  }

}
