import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-smb-route',
  templateUrl: './smb-route.component.html',
  styleUrls: ['./smb-route.component.scss']
})
export class SmbRouteComponent implements OnInit {
  smbsList=[{
    name:'SMB1',
    id:'smb1'
  },{
    name:'SMB2',
    id:'smb2'
  }]

  smbSelected='smb1';
  smbData=[];
  smbStrings=[{name:"String01",val:10},{name:"String02",val:14.56},{name:"String03",val:10},{name:"String04",val:10},
  {name:"String05",val:10},{name:"String06",val:10},{name:"String07",val:10},{name:"String08",val:10},{name:"String09",val:10},
  {name:"String10",val:10},{name:"String11",val:10},{name:"String12",val:10},{name:"String13",val:10}];
  constructor( private router: Router,
    private api:ApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

     this.activatedRoute.queryParams.subscribe((params: Params) => {
      
      if (!params['type']) {
        this.smbSelected =this.smbsList[0].id;
          this.router.navigate(['/smb'], { queryParams: { type: this.smbsList[0].id } })
      } else {
        this.smbSelected = params['type']
      }

      this.getSMBDetails();
     
  })
  }

  getSMBDetails() {
    this.api.getSMBDetails().subscribe(res=>{
      this.smbData = res.message
    },err=>{
      this.smbData =[];
    })
  }

  navigate(item) {
    const self = this;
    if (item) {
      
        self.router.navigate(['/smb'], { queryParams: { type: item.id } });
    } else {
        self.router.navigate(['/smb']);
    }
}
isLinkActive(item): boolean {
    if (item['id'] == this.smbSelected) {
        return true;
    } else {
        return false;
    }
}

}
