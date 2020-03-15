import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tracker-status',
  templateUrl: './tracker-status.component.html',
  styleUrls: ['./tracker-status.component.scss']
})
export class TrackerStatusComponent implements OnInit {
  @ViewChild('sun') sun:ElementRef; 
  @ViewChild('sun1') sun1:ElementRef; 
  angle:number = -40;
  angle1:number = -55;
  constructor() { }
  ngOnInit() {
    // this.sun.nativeElement.style.width = '200px'
    this.drawCircle( 120, this.angle, 0, 0);
    this.drawCircle1( 120, this.angle1, 0, 0);
  }
  drawCircle(  radius, angle, x, y) {
    
    const alpha = Math.PI * 2 ;
    angle *= Math.PI / 180;

      const pointx  =  Math.floor(Math.cos(  alpha+ angle) * radius);
      const pointy  = Math.floor(Math.sin( alpha+angle) * radius );
      this.sun.nativeElement.style.marginLeft = pointx + x + 'px';
      this.sun.nativeElement.style.marginTop = pointy + y + 'px';
      
  
 }
 drawCircle1(  radius, angle, x, y) {
    
  const alpha = Math.PI * 2 ;
  angle *= Math.PI / 180;

    const pointx  =  Math.floor(Math.cos(  alpha+ angle) * radius);
    const pointy  = Math.floor(Math.sin( alpha+angle) * radius );
    this.sun1.nativeElement.style.marginLeft = pointx + x + 'px';
    this.sun1.nativeElement.style.marginTop = pointy + y + 'px';
    

}

}
