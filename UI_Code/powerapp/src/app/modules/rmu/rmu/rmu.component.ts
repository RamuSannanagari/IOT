import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rmu',
  templateUrl: './rmu.component.html',
  styleUrls: ['./rmu.component.scss']
})
export class RmuComponent implements OnInit {
  rmuList=[{
    name:'LBS01',
    status:0
  },{
    name:'LBS02',
    status:0
  },{
    name:'LBS03',
    status:0
  },{
    name:'BRK01/Inv XFMR 1',
    status:0
  },{
    name:'BRK02/Inv XFMR 2',
    status:0
  },{
    name:'BRK03/Inv XFMR',
    status:0
  }]

  invList=[{
    name:'WTT',
    status:1
  },{
    name:'OTT',
    status:1
  },{
    name:'BT',
    status:1
  },{
    name:'WTA',
    status:1
  },{
    name:'OTA',
    status:1
  },{
    name:'BA',
    status:1
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
