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
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private trackerServie: TrackerService
  ) { 

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',this.id);
  }

  ngOnInit() {
    const self = this;
    self.subscriptions['activatedRouteData'] = self.activatedRoute.data.subscribe(data => {
      if (data.hasOwnProperty('trackerInfo')) {
          const trackerList:any[] =  data['trackerInfo'] ||[];
          self.trackerDetails = trackerList.find((_item)=>{
            return _item['Tracker'] == self.id
          })
          self.trackerServie.setTrackerData(self.trackerDetails);
          self.trackerServie.setTrackerId(self.id);
          console.log('tra',self.trackerDetails);
          console.log('id',self.id);
      }
  })
    // const payload = {"R1":["R1 READ:GETALL","R1 READ:SUN","R1 READ:RTC","R1 READ:LAT","R1 READ:LONGITUDE","R1 READ:TRACKER","R1 READ:ZONE","R1 READ:MODE","R1 READ:HR","R1 READ:MIN","R1 READ:SEC","R1 READ:DATE","R1 READ:MONTH","R1 READ:YEAR","R1 READ:DAY"]};
    // this.apiService.addLocationDetails(payload).subscribe((_res)=>{
    //   console.log('_res',_res);
    // })
  }

}
