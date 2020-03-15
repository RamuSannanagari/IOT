import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tracker-control',
  templateUrl: './tracker-control.component.html',
  styleUrls: ['./tracker-control.component.scss']
})
export class TrackerControlComponent implements OnInit {
  @ViewChild('sun') sun:ElementRef; 
  angle:number = -45;
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    // this.sun.nativeElement.style.width = '200px'
    this.drawCircle( 120, this.angle, 0, 0)
  }
  draw(){
    this.angle = this.angle +5;
    this.drawCircle( 120, this.angle, 0, 0);
  }
   drawCircle(  radius, angle, x, y) {
    
    const alpha = Math.PI * 2 ;
    angle *= Math.PI / 180;

      const pointx  =  Math.floor(Math.cos(  alpha+ angle) * radius);
      const pointy  = Math.floor(Math.sin( alpha+angle) * radius );
      this.sun.nativeElement.style.marginLeft = pointx + x + 'px';
      this.sun.nativeElement.style.marginTop = pointy + y + 'px';
      
  
 }

}
