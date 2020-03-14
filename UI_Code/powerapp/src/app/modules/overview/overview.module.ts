import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const routes: Routes = [{
  path: '',
  component: OverviewComponent,
  children:[{
    path:'',
    component:DeviceViewComponent
  },{
    path:'device',
    component:DeviceViewComponent
  }]

}];
@NgModule({
  declarations: [OverviewComponent, DeviceViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class OverviewModule { }
