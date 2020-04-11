import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.scss']
})
export class TrackerListComponent implements OnInit {
  trackerList:Array<any>=[
   
  ];
  subscriptions:any={};
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.getTrackerList();
  }
  getTrackerList(){
    const self = this;
    self.subscriptions['trackerList'] = self.apiService.getTrackerList().subscribe((_res)=>{
      self.trackerList = _res['message']?_res['message']:[];
    })
  }
  ngOnDestroy(){
    const self = this;
    Object.keys(self.subscriptions).forEach(e=>{
      self.subscriptions[e].unsubscribe()
    })
    
  }
}
