import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PowerComponent } from './dashboard/components/power/power.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];
@NgModule({
  declarations: [DashboardComponent,PowerComponent],
  imports: [
    CommonModule,
    NgbModule,
        FormsModule,
        NgxChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
