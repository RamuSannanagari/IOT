import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
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

    margin = ({top: 20, right: 30, bottom: 30, left: 40});
    data1: any[] = [
        {date: new Date('2010-01-01'), value: 80},
        {date: new Date('2010-01-04'), value: 90},
        {date: new Date('2010-01-05'), value: 95},
        {date: new Date('2010-01-06'), value: 100},
        {date: new Date('2010-01-07'), value: 110},
        {date: new Date('2010-01-08'), value: 120},
        {date: new Date('2010-01-09'), value: 130},
        {date: new Date('2010-01-10'), value: 140},
        {date: new Date('2010-01-11'), value: 150},
        ];
    
  onSelect(event) {
      console.log(event);
  }

  ngOnInit() {

    
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
          setTimeout(()=>{
            this.initGraph();
          },400)
          
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

  initGraph() {
    let  svgWidth = 600, svgHeight = 400;   var margin = { top: 20, right: 20, bottom: 30, left: 50 };   var width = svgWidth - margin.left - margin.right;   var height = svgHeight - margin.top - margin.bottom;
     
    let svg = d3.select('svg#' + 'test')
    .attr("width", svgWidth).attr("height", svgHeight);;
    svg.selectAll('text').remove();
    

   let  g = svg.append("g")   .attr("transform",       "translate(" + margin.left + "," + margin.top + ")"   );
   
   let x = d3Scale.scaleTime().range([0, width]).domain(d3Array.extent(this.data1, (d) => d.date ));

 
   let y = d3Scale.scaleLinear().range([height, 0]).
   domain(d3Array.extent(this.data1, (d) => d.value ));

       // Configure the Y Axis
       svg.append('g')
       .attr('transform', 'translate(0,' + height + ')')
       .call(d3Axis.axisBottom(x));
   // Configure the Y Axis
   svg.append('g')
       .attr('class', 'axis axis-y')
       .call(d3Axis.axisLeft(y));

   let line = d3Shape.line()
   .x( (d: any) => x(d.date) )
   .y( (d: any) => y(d.value) );

   svg.append('path')
            .datum(this.data1)
            .attr('class', 'line')
            .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);
    if(0) {
        svg.selectAll('text').remove();
        svg.selectAll('g').remove();
        svg.append('text').attr("x", 20).attr("y", 50).text("No Data available for selected date range.").style('font-size', '10px')
    }
   
  }

  

 
   
}
