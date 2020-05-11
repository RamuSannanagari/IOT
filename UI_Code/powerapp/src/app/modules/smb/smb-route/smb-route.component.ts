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
  smbStrings=[
    {name:"String1",vol:'vol1'},
    {name:"String2",vol:'vol2'},
    {name:"String3",vol:'vol3'},
    {name:"String4",vol:'vol4'},
    {name:"String5",vol:'vol5'},
    {name:"String6",vol:'vol6'},
    {name:"String7",vol:'vol7'},
    {name:"String8",vol:'vol8'},
    {name:"String9",vol:'vol9'},
    {name:"String10",vol:'vol10'},
    {name:"String11",vol:'vol11'},
    {name:"String12",vol:'vol12'},
    {name:"String13",vol:'vol13'}];

    stringValues=[];
    dashboardValues={
      'power':0,
      'current':0,
      'voltage':0
    };
  results=[];
  chartFormat = [
    {
      "name": "String1",
      "series": [
      ]
    },
  
    {
      "name": "String2",
      "series": [
      ]
    },
    {
      "name": "String3",
      "series": [
      ]
    },
  
    {
      "name": "String4",
      "series": [
      ]
    },{
      "name": "String5",
      "series": [
      ]
    },
  
    {
      "name": "String6",
      "series": [
      ]
    },{
      "name": "String7",
      "series": [
      ]
    },
  
    {
      "name": "String8",
      "series": [
      ]
    },
   {
      "name": "String9",
      "series": [
      ]
    },
  
    {
      "name": "String10",
      "series": [
      ]
    },{
      "name": "String11",
      "series": [
      ]
    },
    {
      "name": "String12",
      "series": [
      ]
    },
  
    {
      "name": "String13",
      "series": [
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

 refreshInterval;
refreshDuration=8*60*1000;
subscription={};

dash

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

  this.setRefreshInterval();
  }

  setRefreshInterval() {
    if(this.refreshInterval)
     clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(()=>{
      if(this.smbSelected)
       this.getSMBDetails();
    },this.refreshDuration); 
     
  }

 
  getSMBDetails() {
    this.subscriptions['getSMBDetails'] = this.api.getSMBDetails(this.smbSelected).subscribe(res=>{
      this.smbData = res.message;
      this.formatData();
      if(this.smbData.length>0)
        this.getDashboardValues(this.smbData[this.smbData.length-1])

    },err=>{
      this.smbData =[];
    })
  }

  getDashboardValues(val) {
    let dashboard:any = this.deepClone(this.smbStrings);
    Object.keys(val).map((key)=>{
      let index = dashboard.findIndex((v)=> v.name===key||v.vol===key);
      if(index>-1) {
        dashboard[index][dashboard[index].name==key?'current':'voltage']=val[key];
      }

    });
    this.stringValues = dashboard;

    this.stringValues.map((v)=>{
      this.dashboardValues['current']+=v.current;
      this.dashboardValues['voltage']+=v.voltage;
    })
    this.dashboardValues['power']=this.dashboardValues['current']*this.dashboardValues['voltage'];

  }
  
  formatData() {
    let chartFormat:any = this.deepClone(this.chartFormat);
    this.smbData.forEach((val)=>{
      chartFormat=  this.pushValuesTochartFormat(val,chartFormat);

    })

    this.results = chartFormat;
  }

  pushValuesTochartFormat(val,chartFormat) {
   
    Object.keys(val).map((key)=>{
      let index = chartFormat.findIndex((series)=> series.name===key);
      if(index>-1) {
        chartFormat[index].series.push({
          name:val['time'],
          value:val[key]
        })
      }

    });

    return chartFormat

  }

  deepClone(val){
   return JSON.parse(JSON.stringify(val))
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

ngOnDestroy() {
  if(this.refreshInterval)
    clearInterval(this.refreshInterval);

    Object.keys(this.subscription).map(key=>{
        this.subscription[key].unsubscribe();
    })
}

}
