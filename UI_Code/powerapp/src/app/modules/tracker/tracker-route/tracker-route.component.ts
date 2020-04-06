import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) { 

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id',this.id);
  }

  ngOnInit() {
  }

}
