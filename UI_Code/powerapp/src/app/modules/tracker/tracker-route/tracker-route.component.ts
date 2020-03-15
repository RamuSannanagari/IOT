import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracker-route',
  templateUrl: './tracker-route.component.html',
  styleUrls: ['./tracker-route.component.scss']
})
export class TrackerRouteComponent implements OnInit {
  today:Date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
