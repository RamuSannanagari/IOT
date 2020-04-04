import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class SMBResolver implements Resolve<any> {
    constructor(
        private api: ApiService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const self = this;
        return self.api.getSMBList().toPromise().then((response) => {
            return response;
        }, (error) => {
            return null;
        });
    }
}
