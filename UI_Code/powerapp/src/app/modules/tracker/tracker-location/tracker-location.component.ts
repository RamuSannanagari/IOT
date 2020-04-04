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
    if(this.locationForm.valid){
     const res = self.generatePayload(self.locationForm.value);
     self.apiService.addLocationDetails(res).subscribe((_res)=>{
       console.log('_res',_res);
       self.alertService.success('Added success fully');
       self.locationForm.reset();
     })
     
    }
    console.log('s',this.locationForm.value);
  }
  generatePayload(formData){
    const datetime = formData['datetime'].split(' ');
    const datesArray = datetime[0].split('/');
    const timesArray = datetime[1].split(':');
    const payload ={
      "r1":`Write:lat_${formData['latitude']}`,
      "r2":`Write:lon_${formData['longitude']}`,
      "r3":`Write:sec_${timesArray[2]}`,
      "r4":`Write:min_${timesArray[1]}`,
      "r5":`Write:hr_${timesArray[0]}`,
      "r6":`Write:date_${datesArray[0]}`,
      "r7":`Write:month_${datesArray[1]}`,
      "r8":`Write:year_${datesArray[2]}`,
      "r9":`Write:zone_${formData['timezone']}`,
      "r10":`Write:manual_east`,
      "r11":`Write:manual_west`

    }
    return payload;
  }

}
