import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker-list',
  templateUrl: './tracker-list.component.html',
  styleUrls: ['./tracker-list.component.scss']
})
export class TrackerListComponent implements OnInit {
  trackerList:Array<any>=[
    {
      name:'SMT01',
      id:'S1',
      sunAngle:'43.5',
      trackerAngle:'22.8',
      lastUpdated: new Date()
    },
    {
      name:'SMT02',
      id:'S2',
      sunAngle:'33.5',
      trackerAngle:'19.8',
      lastUpdated: new Date()
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
