import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tracker-route',
  templateUrl: './tracker-route.component.html',
  styleUrls: ['./tracker-route.component.scss']
})
export class TrackerRouteComponent implements OnInit {
  today:Date = new Date();
  id:any;
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { 

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',this.id);
  }

  ngOnInit() {
    const payload = {"R1":["R1 READ:GETALL","R1 READ:SUN","R1 READ:RTC","R1 READ:LAT","R1 READ:LONGITUDE","R1 READ:TRACKER","R1 READ:ZONE","R1 READ:MODE","R1 READ:HR","R1 READ:MIN","R1 READ:SEC","R1 READ:DATE","R1 READ:MONTH","R1 READ:YEAR","R1 READ:DAY"]};
    this.apiService.addLocationDetails(payload).subscribe((_res)=>{
      console.log('_res',_res);
    })
  }

}
