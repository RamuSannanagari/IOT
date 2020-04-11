import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class TrackerResolver implements Resolve<any> {
    constructor(
        private api: ApiService
        ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const self = this;
        const params = {
            Tracker: route.paramMap.get('id')
        }
        
        return self.api.getTrackerData(params).toPromise().then((response) => {
            return response.message;
        }, (error) => {
            return null;
        });
    }
}
