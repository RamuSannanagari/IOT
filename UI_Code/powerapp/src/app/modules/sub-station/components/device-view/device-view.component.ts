import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ExportToCsv } from 'export-to-csv';
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
      this.maxDate = new Date();
      this.selectedDate =[new Date(),new Date()];
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
selectedSubstation='';
subSationList=[];
rphvolData:any;
rphcuData:any;
rphpfData:any

refreshInterval;
refreshDuration=8*60*1000;
subscription={};
selectedDate=[];
maxDate;

getAgrrigateHis=[];
aggTableHeaders=[];

  onSelect(event) {
      console.log(event);
  }

  ngOnInit() {
      
    this.getSubstationList();
    this.setRefreshInterval();
  }

  //get substation list
  getSubstationList() {
    this.subscription['getsubstationList'] = this.apiService.getSubStationList('SUB_STATIONS').subscribe(res=>{
        this.subSationList = res.SUB_STATIONS;
    })
  }

  //get device list from selected substation
  getDeviceList() {
    this.subscription['getDevicesList'] = this.apiService.getDevicesList(this.selectedSubstation).subscribe(res=>{
        this.devicesList = res.devices;
    })
  }

  //refresh data every 8mins
  setRefreshInterval() {
    if(this.refreshInterval)
     clearInterval(this.refreshInterval);
    this.refreshInterval = setInterval(()=>{
        if(this.selectedDevice)
            this.getDeviceData()
    },this.refreshDuration); 
     
  }

  resetData() {
    this.maxDate = new Date();
    this.selectedDate =[new Date(),new Date()];
    this.data=null;
    this.getAgrrigateHis=[];
  }
 
  //change device callback
  changeDevice(val) {
    this.setRefreshInterval();
    this.resetData();
    this.getDeviceData();
  }
  
  //change substation callback
  changeSubStation(val){
    this.selectedDevice="";
    this.devicesList=[];
    this.resetData();
    if(this.selectedSubstation) {
        this.getDeviceList()
    }
  }


  tickFormatting(value): string {
      const date = new Date(value);
      return date.toLocaleString();
    }

    onDateChange(date) {
        this.getDeviceData();
    }
  
  getDeviceData() {
       const self = this;

       this.getAggregate();
       
       this.subscription['getDeviceData'] = self.apiService.getDeviceData(this.selectedDevice).subscribe((_res) => {
          self.data = _res.message;
          self.rphvolData = self.formatData('rphvol');
          self.rphcuData = self.formatData('rphcu');
          self.rphpfData = self.formatData('rphpf');
          self.tableHeaders = self.data[0]?Object.keys(self.data[0]):[];
          self.tableValues = self.data?Object.values(self.data[self.data.length-1]):[];

          self.tableHeaders =  self.tableHeaders.sort((a,b)=>{ if(a=='deviceId'|| a=='deviceName') return -1; else if(b=='deviceId'||b=='deviceName') return 1; else return 0})
      })
  }

  getAggregate() {
    this.subscription['getAggregate'] = this.apiService.getAggregate(this.selectedDevice,this.formatDate(this.selectedDate[0]),this.formatDate(this.selectedDate[1])).subscribe((res)=>{
        this.getAgrrigateHis=res.message;
        this.aggTableHeaders = this.getAgrrigateHis[0]?Object.keys(this.getAgrrigateHis[0]):[];
    },err=>{

    })
  }

  export() {
    const csvExporter = new ExportToCsv( { 
        fieldSeparator: ',',
        filename:'power consumption',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Power consumption ('+this.formatDate(this.selectedDate[0])+' to '+this.formatDate(this.selectedDate[1])+')',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['Date', 'Device Id', 'Average Pf', 'Average Voltage','Average Current', 'Power Consumption'] 
      });

    csvExporter.generateCsv(this.getAgrrigateHis);
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

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

 
   
}
