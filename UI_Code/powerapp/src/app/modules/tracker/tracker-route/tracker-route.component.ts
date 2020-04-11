import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-tracker-route',
  templateUrl: './tracker-route.component.html',
  styleUrls: ['./tracker-route.component.scss']
})
export class TrackerRouteComponent implements OnInit {
  today:Date = new Date();
  id:any;
  subscriptions:any={}
  trackerDetails:any;
  apiInterval:any;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private trackerService: TrackerService
  ) { 

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',this.id);
  }

  ngOnInit() {
    const self = this;
    self.subscriptions['tracker'] = this.trackerService.currentTrackerSubject.subscribe((_res)=>{
      self.trackerDetails = _res;
    });
    const apiIntervalTime:number = self.apiService.getApiIntervalTime();
    self.apiInterval = setInterval(()=>{
      const params = {
        Tracker: this.id
    }
       self.apiService.getTrackerData(params).toPromise().then((response) => { 
        if(Array.isArray(response.message) && response.message.length){
          this.trackerService.setTrackerData(response.message[0])
        }
  
    }, (error) => {
  
    });
    },apiIntervalTime);
    self.trackerService.setTrackerId(self.id);
  
  }
  ngOnDestroy(){
    const self = this;
    Object.keys(self.subscriptions).forEach(e=>{
      self.subscriptions[e].unsubscribe()
    })
    if(self.apiInterval){
      clearInterval(self.apiInterval);
    }
  }
  

}
