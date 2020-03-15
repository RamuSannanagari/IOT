import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tracker-location',
  templateUrl: './tracker-location.component.html',
  styleUrls: ['./tracker-location.component.scss']
})
export class TrackerLocationComponent implements OnInit {
  locationForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    const self = this;
    self.buildForm();
  }
  buildForm(){
    const self = this;
    self.locationForm = self.formBuilder.group({
      datetime: ['', []],
      latitude: ['', []],
      longitude: ['', []],
      timezone: ['', []],
      eastLimit: ['', []],
      westLimit: ['', []],
    })
  }

}
