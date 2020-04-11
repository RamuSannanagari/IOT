import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TrackerService } from 'src/app/services/tracker.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tracker-control',
  templateUrl: './tracker-control.component.html',
  styleUrls: ['./tracker-control.component.scss']
})
export class TrackerControlComponent implements OnInit {
  @ViewChild('sun') sun:ElementRef; 
  angle:number = -45;
  trackerDetails:any;
  subscriptions:any={};
  constructor(
    private elementRef: ElementRef,
    private trackerService: TrackerService,
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    
    this.subscriptions['tracker'] = this.trackerService.currentTrackerSubject.subscribe((_res)=>{
      this.trackerDetails = _res;
      this.angle = this.trackerDetails['Sun_Angle']? (-1)*this.trackerDetails['Sun_Angle']+5 : -40;
      this.drawCircle( 120, this.angle, 0, 0)
    })
  
  }
  draw(){
    
    
    this.drawCircle( 120, this.angle, 0, 0);
  }
   drawCircle(  radius, angle, x, y) {
    
    const alpha = Math.PI * 2 ;
    angle *= Math.PI / 180;

      const pointx  =  Math.floor(Math.cos(  alpha+ angle) * radius);
      const pointy  = Math.floor(Math.sin( alpha+angle) * radius );
      this.sun.nativeElement.style.marginLeft = pointx + x + 'px';
      this.sun.nativeElement.style.marginTop = pointy + y + 'px';
      
  
 }
 onSend(val) {
  const self = this;
  const payload = self.generatePayload(val);
  self.subscriptions['locations'] = self.apiService.addLocationDetails(payload).subscribe((_res) => {
    console.log('_res', _res);
    self.alertService.success('All changes saved success fully');
  })
}
generatePayload(val) {
  const self = this;
  const id = self.trackerService.getTrackerId();
  const payload = {
    [id]: `${id} WRITE:${val}`
  };
  return payload;
}
ngOnDestroy(){
  const self = this;
  Object.keys(self.subscriptions).forEach(e=>{
    self.subscriptions[e].unsubscribe()
  })
}

}
