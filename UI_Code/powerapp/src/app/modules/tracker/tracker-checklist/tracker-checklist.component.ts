import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tracker-checklist',
  templateUrl: './tracker-checklist.component.html',
  styleUrls: ['./tracker-checklist.component.scss']
})
export class TrackerChecklistComponent implements OnInit {
  checklist:Array<any>=[];
  today:Date = new Date();
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const self = this;
    self.getChecklist();
  }
  getChecklist(){
    const self = this;
    self.apiService.getCheckList().subscribe((_res)=>{
      self.checklist = _res;
    })
  }

}
