import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { TrackerService } from 'src/app/services/tracker.service';

@Component({
  selector: 'app-tracker-location',
  templateUrl: './tracker-location.component.html',
  styleUrls: ['./tracker-location.component.scss']
})
export class TrackerLocationComponent implements OnInit {
  locationForm: FormGroup;
  submitted = false;
  trackerDetails:any;
  subscriptions:any={};
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService,
    private trackerService: TrackerService
  ) { }

  ngOnInit() {
    const self = this;
    self.buildForm();
    self.subscriptions['tracker'] = self.trackerService.currentTrackerSubject.subscribe((_res)=>{
      console.log('_res',_res);
      self.trackerDetails = _res;
    self.setData(self.trackerDetails);
    })
    
    
  }
  setData(data){
    this.locationForm.patchValue({
      latitude: data['Latitude'] || '',
      longitude: data['Longitude'] || '',
      timezone: data['TimeZone'] || '',
      eastLimit: data['REVLIMIT'] || '',
      westLimit: data['FWDLIMIT'] || '',
      date: data['DATE'] ||'',
      month: data['MONTH'] ||'',
      year: data['YEAR'] ||'',
      hour: data['HR'] ||'',
      min: data['MIN'] ||'',
      sec: data['SEC'] ||'',
    })
  }
  buildForm() {
    const self = this;
    self.locationForm = self.formBuilder.group({
      datetime: ['', [Validators.required]],
      date: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      min: ['', [Validators.required]],
      sec: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      timezone: ['', [Validators.required]],
      eastLimit: ['', [Validators.required]],
      westLimit: ['', [Validators.required]],
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.locationForm.controls; }
  onSubmit() {
    const self = this;
    self.submitted = true;
    // if(this.locationForm.valid){
    //  const res = self.generatePayload(self.locationForm.value);
    //  self.apiService.addLocationDetails(res).subscribe((_res)=>{
    //    console.log('_res',_res);
    //    self.alertService.success('Added success fully');
    //    self.locationForm.reset();
    //  })

    // }
    console.log('s', this.locationForm.value);
  }
  onSend(control) {
    const self = this;
    const payload = self.generatePayload(control);
    self.subscriptions['locationDetails'] = self.apiService.addLocationDetails(payload).subscribe((_res) => {
      console.log('_res', _res);
      self.alertService.success('Added success fully');
      self.trackerService.setTrackerData(self.trackerDetails);
      
      
    })
    console.log('pay', payload)


  }
  generatePayload(control) {
    const self = this;
    const controlVal = self.locationForm.controls[control].value;
    let payload = {};
    const id = self.trackerService.getTrackerId();

    switch (control) {
        case 'date':
        payload = {
         [id]: `${id} WRITE:DATE_${controlVal}`
        }
        self.trackerDetails['DATE'] = controlVal;
        break;
        case 'month':
        payload = {
         [id]: `${id} WRITE:MONTH_${controlVal}`
        }
        self.trackerDetails['MONTH'] = controlVal;
        break;
        case 'year':
        payload = {
         [id]: `${id} WRITE:YEAR_${controlVal}`
        }
        self.trackerDetails['YEAR'] = controlVal;
        break;
        case 'hour':
        payload = {
         [id]: `${id} WRITE:HR_${controlVal}`
        }
        self.trackerDetails['HR'] = controlVal;
        break;
        case 'min':
        payload = {
         [id]: `${id} WRITE:MIN_${controlVal}`
        }
        self.trackerDetails['MIN'] = controlVal;
        break;
        case 'sec':
        payload = {
         [id]: `${id} WRITE:SEC_${controlVal}`
        }
        self.trackerDetails['SEC'] = controlVal;
        break;
      case 'latitude':
        payload = {
         [id]: `${id} WRITE:LAT_${controlVal}`
        }
        self.trackerDetails['Latitude'] = controlVal;
        break;
      case 'longitude':
        payload = {
         [id]: `${id} WRITE:LONGITUDE_${controlVal}`
        }
        self.trackerDetails['Longitude'] = controlVal;
        break;
      case 'timezone':
        payload = {
         [id]: `${id} WRITE:TIMEZONE_${controlVal}`
        }
        self.trackerDetails['TimeZone'] = controlVal;
        break;
      case 'eastLimit':
        payload = {
         [id]: `${id} WRITE:REVLIMIT_${controlVal}`
        }
        break;
      case 'westLimit':
        payload = {
         [id]: `${id} WRITE:FWDLIMIT_${controlVal}`
        }
        break;
    }

    // const payload ={
    //  [id]:`WRITE:lat_${formData['latitude']}`,
    //   "r2":`WRITE:lon_${formData['longitude']}`,

    //   "r9":`WRITE:zone_${formData['timezone']}`,
    //   "r10":`WRITE:manual_east`,
    //   "r11":`WRITE:manual_west`

    // }
    return payload;
  }
  ngOnDestroy(){
    const self = this;
    Object.keys(self.subscriptions).forEach(e=>{
      self.subscriptions[e].unsubscribe()
    })
  }

}
