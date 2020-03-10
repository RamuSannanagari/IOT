import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbCalendar, NgbDateParserFormatter, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-power',
    templateUrl: './power.component.html',
    styleUrls: ['./power.component.scss']
})
export class PowerComponent implements OnInit {
    selectedUserTab = 1;
    tabs = [
        {
            name: 'Overview',
            key: 1,
            active: true
        },
        {
            name: 'Meter1',
            key: 2,
            active: false
         }
        // ,
        // {
        //     name: 'Meter2',
        //     key: 3,
        //     active: false
        // },
        // {
        //     name: 'Meter3',
        //     key: 4,
        //     active: false
        // },
        // {
        //     name: 'Meter4',
        //     key: 5,
        //     active: false
        // }
    ];

    data: any;
    maxDate: NgbDate
    ;
    toDate: NgbDate;
    fromDate: NgbDate;
    hoveredDate;
    tableHeaders: any;
    tableValues: unknown[];
    
    constructor(private apiService: ApiService,private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getToday();
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
      daterangepickerModel;

    onSelect(event) {
        console.log(event);
    }

    ngOnInit() {

       
    this.maxDate =this.calendar.getToday();
       
        this.apiService.getDevicesList().subscribe(res=>{
            this.devicesList = res.message;
        })
    }
   
    changeDevice(val) {
        this.getDeviceData();
    }
    tickFormatting(value): string {
        const date = new Date(value);
        return date.toLocaleString();
      }
    
    getDeviceData() {
         const self = this;
         self.isLoading = true;
        self.apiService.getDeviceData(this.selectedDevice).subscribe((_res) => {
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

    tabChange(selectedTab) {
        
        this.selectedUserTab = selectedTab.key;
        for (let tab of this.tabs) {
            if (tab.key === selectedTab.key) {
                tab.active = true;
            } else {
                tab.active = false;
            }
        }
    }

    onValueChange($event) {
        console.log($event);
    }


    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
          this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
          this.toDate = date;
        } else {
          this.toDate = null;
          this.fromDate = date;
        }
      }
    
      isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
      }
    
      isInside(date: NgbDate) {
        return date.after(this.fromDate) && date.before(this.toDate);
      }
    
      isRange(date: NgbDate) {
        return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
      }
    
      validateInput(currentValue: NgbDate, input: string): NgbDate {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
      }
}
