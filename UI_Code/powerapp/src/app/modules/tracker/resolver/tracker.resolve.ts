import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Injectable({
    providedIn: 'root'
})
export class TrackerResolver implements Resolve<any> {
    constructor(
        private api: ApiService,
        private trackerService: TrackerService
        ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const self = this;
        const params = {
            Tracker: route.paramMap.get('id')
        }
        
            return self.api.getTrackerData(params).toPromise().then((response) => {
                
                this.trackerService.setTrackerData(response.message[0])
                return response.message;
            }, (error) => {
                return null;
            });
        
        
    }
}
