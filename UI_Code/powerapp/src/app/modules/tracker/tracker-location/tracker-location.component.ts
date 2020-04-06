import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-tracker-location',
  templateUrl: './tracker-location.component.html',
  styleUrls: ['./tracker-location.component.scss']
})
export class TrackerLocationComponent implements OnInit {
  locationForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    const self = this;
    self.buildForm();
  }
  buildForm(){
    const self = this;
    self.locationForm = self.formBuilder.group({
      datetime: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      timezone: ['', [Validators.required]],
      eastLimit: ['', [Validators.required]],
      westLimit: ['', [Validators.required]],
    })
  }
  // convenience getter for easy access to form fields
  get f() { return this.locationForm.controls; }
  onSubmit(){
    const self =this;
    self.submitted = true;
    // if(this.locationForm.valid){
    //  const res = self.generatePayload(self.locationForm.value);
    //  self.apiService.addLocationDetails(res).subscribe((_res)=>{
    //    console.log('_res',_res);
    //    self.alertService.success('Added success fully');
    //    self.locationForm.reset();
    //  })
     
    // }
    console.log('s',this.locationForm.value);
  }
  onSend(control){
    const self = this;
    const payload = self.generatePayload(control);
    console.log('pay',payload)

    
  }
  generatePayload(control){
    const self = this;
    const controlVal = self.locationForm.controls[control].value;
    let payload ={};
    switch(control){
      case  'datetime':
      const datetime = controlVal.split(' ');
    const datesArray = datetime[0].split('/');
    const timesArray = datetime[1].split(':');
      payload ={
        "r1":`WRITE:sec_${timesArray[2]}`,
      "r2":`WRITE:min_${timesArray[1]}`,
      "r3":`WRITE:hr_${timesArray[0]}`,
      "r4":`WRITE:date_${datesArray[0]}`,
      "r5":`WRITE:month_${datesArray[1]}`,
      "r6":`WRITE:year_${datesArray[2]}`,
      }
      break;
      case 'latitude':
        payload = {
          "r1": `WRITE:LAT_${controlVal}`
        }
        break;
        case 'longitude':
          payload = {
            "r1": `WRITE:LONGITUDE_${controlVal}`
          }
          break;
          case 'timezone':
          payload = {
            "r1": `WRITE:TIMEZONE_${controlVal}`
          }
          break;
          case 'eastLimit':
          payload = {
            "r1": `WRITE:REVLIMIT_${controlVal}`
          }
          break;
          case 'westLimit':
          payload = {
            "r1": `WRITE:FWDLIMIT_${controlVal}`
          }
          break;
    }
    
    // const payload ={
    //   "r1":`WRITE:lat_${formData['latitude']}`,
    //   "r2":`WRITE:lon_${formData['longitude']}`,
      
    //   "r9":`WRITE:zone_${formData['timezone']}`,
    //   "r10":`WRITE:manual_east`,
    //   "r11":`WRITE:manual_west`

    // }
    return payload;
  }

}
