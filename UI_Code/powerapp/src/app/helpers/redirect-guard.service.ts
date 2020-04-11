import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuardService implements CanActivate {
  constructor(
      private router: Router, private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser && currentUser.category == 'ttd') {
        // authorised so return true
        this.router.navigate(['/station']);
        return true;
    } else if(currentUser && currentUser.category == 'other') {
        this.router.navigate(['/smb']);
        return true;
    }
     // not logged in so redirect to login page with the return url
     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
     return false;
  }
}