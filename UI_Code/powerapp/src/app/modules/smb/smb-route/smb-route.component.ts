import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-smb-route',
  templateUrl: './smb-route.component.html',
  styleUrls: ['./smb-route.component.scss']
})
export class SmbRouteComponent implements OnInit {
  smbsList=[]

  smbSelected='smb1';
  smbData=[];
  subscriptions={};
  smbStrings=[{name:"String01",val:10},{name:"String02",val:14.56},{name:"String03",val:10},{name:"String04",val:10},
  {name:"String05",val:10},{name:"String06",val:10},{name:"String07",val:10},{name:"String08",val:10},{name:"String09",val:10},
  {name:"String10",val:10},{name:"String11",val:10},{name:"String12",val:10},{name:"String13",val:10}];

  results = [
    {
      "name": "String 01",
      "series": [
        {
          "name": "2020-03-25 14:53:27.360542927",
          "value": 10
        },
        {
          "name": "2020-03-26 14:53:37.360542927",
          "value": 5
        },{
          "name": "2020-03-27 14:53:47.360542927",
          "value": 10
        },
        {
          "name": "2020-03-28 14:53:57.360542927",
          "value": 5
        },
        {
          "name": "2020-03-29 14:54:27.360542927",
          "value": 10
        },
        {
          "name": "2020-03-30 14:55:37.360542927",
          "value": 5
        }
      ]
    },
  
    {
      "name": "String 02",
      "series": [
        {
          "name": "2020-03-25 14:53:27.360542927",
          "value": 4
        },
        {
          "name": "2020-03-26 14:53:37.360542927",
          "value": 5
        },{
          "name": "2020-03-27 14:53:47.360542927",
          "value": 3
        },
        {
          "name": "2020-03-28 14:53:57.360542927",
          "value": 6
        },
        {
          "name": "2020-03-29 14:54:27.360542927",
          "value": 6
        },
        {
          "name": "2020-03-30 14:55:37.360542927",
          "value": 3
        }
      ]
    }
  ]

   // options
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = false;
   showXAxisLabel = false;
   xAxisLabel = '';
   showYAxisLabel = true;
   yAxisLabel = 'A';
 
   colorScheme = {
       domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };
    // options
 
 timeline = true;
  constructor( private router: Router,
    private api:ApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    const self = this;
    self.subscriptions['activatedRouteData'] = self.activatedRoute.data.subscribe(data => {
        if (data.hasOwnProperty('smbInfo')) {
            self.smbsList =  data['smbInfo'] ||[];
        }
    })
     this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (!params['type']) {
          this.router.navigate(['/smb'], { queryParams: { type: this.smbsList[0]} })
      } else {
        this.smbSelected = params['type']
        this.getSMBDetails();
      }

     
     
  })
  }

  getSMBDetails() {
    this.api.getSMBDetails(this.smbSelected).subscribe(res=>{
      this.smbData = res.message
    },err=>{
      this.smbData =[];
    })
  }

  navigate(item) {
    const self = this;
    if (item) {
      
        self.router.navigate(['/smb'], { queryParams: { type: item} });
    } else {
        self.router.navigate(['/smb']);
    }
}
isLinkActive(item): boolean {
    if (item == this.smbSelected) {
        return true;
    } else {
        return false;
    }
}

tickFormatting(value): string {
  const date = new Date(value);
  return date.toLocaleString();
}

}
