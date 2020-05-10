import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss']
})
export class DeviceViewComponent implements OnInit {

 

  data: any;
  hoveredDate;
  tableHeaders: any;
  tableValues: unknown[];
  
  constructor(private apiService: ApiService) {
  }




  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Voltage';

  colorScheme = {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
   // options

timeline = true;

// line, area
autoScale = true;
devicesList=[];
isLoading:boolean = false;
selectedDevice='';
rphvolData:any;
rphcuData:any;
rphpfData:any

refreshInterval;
refreshDuration=8*60*1000;
subscription={};

  onSelect(event) {
      console.log(event);
  }

  ngOnInit() {
    this.subscription['getDevicesList'] = this.apiService.getDevicesList().subscribe(res=>{
        this.devicesList = res.message;
    })
    this.setRefreshInterval();
  }

  setRefreshInterval() {
    if(this.refreshInterval)
     clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(()=>{
        if(this.selectedDevice)
            this.getDeviceData()
    },this.refreshDuration); 
     
  }
 
  changeDevice(val) {
      console.log('val',val);
    this.setRefreshInterval();
    this.getDeviceData()
  }
  tickFormatting(value): string {
      const date = new Date(value);
      return date.toLocaleString();
    }
  
  getDeviceData() {
       const self = this;
       self.isLoading = true;
       this.subscription['getDeviceData'] = self.apiService.getDeviceData(this.selectedDevice).subscribe((_res) => {
         self.isLoading = false;
          self.data = _res.message;
          self.rphvolData = self.formatData('rphvol');
          self.rphcuData = self.formatData('rphcu');
          self.rphpfData = self.formatData('rphpf');
          self.tableHeaders = self.data[0]?Object.keys(self.data[0]):[];
          self.tableValues = self.data?Object.values(self.data[self.data.length-1]):[];

          self.tableHeaders =  self.tableHeaders.sort((a,b)=>{ if(a=='deviceId'|| a=='deviceName') return -1; else if(b=='deviceId'||b=='deviceName') return 1; else return 0})
      },()=>{
          self.isLoading = false;
      })
  }

  formatData(key) {
      let val = {};
      this.data.forEach((point)=>{
          if(!val[point.deviceId]) {
              val[point.deviceId] = {
                  name: point.deviceId,
                  series:[{
                      name:new Date(point.time),
                      value:point[key],
                      time:point.time
                  }]
              }
          } else {
              val[point.deviceId].series.push({
                  name:new Date(point.time),
                  value:point[key],
                  time:point.time
              })
          }
      });
      let chartData=[]
      Object.keys(val).forEach((key)=>{
          chartData.push(val[key]);
      })

      return chartData;

  }

  getDateString(date) {
      return date.getDate() +'-'+(date.getMonth()+1)+'-'+date.getFullYear();
  }

 
  onValueChange($event) {
      console.log($event);
  }


  ngOnDestroy() {
      if(this.refreshInterval)
        clearInterval(this.refreshInterval);

        Object.keys(this.subscription).map(key=>{
            this.subscription[key].unsubscribe();
        })
  }

 
   
}
