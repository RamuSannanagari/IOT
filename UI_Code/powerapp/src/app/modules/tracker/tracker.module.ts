import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerChecklistComponent } from './tracker-checklist/tracker-checklist.component';
import { Routes, RouterModule } from '@angular/router';
import { TrackerStatusComponent } from './tracker-status/tracker-status.component';
import { TrackerRouteComponent } from './tracker-route/tracker-route.component';
import { TrackerLocationComponent } from './tracker-location/tracker-location.component';
import { NgxMaskModule } from 'ngx-mask'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackerControlComponent } from './tracker-control/tracker-control.component';
import { TrackerHomeComponent } from './tracker-home/tracker-home.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerRouteComponent,
    children:[
      {
        path: 'status',
        component: TrackerStatusComponent
      },
      {
        path: 'home',
        component: TrackerHomeComponent
      },
      {
        path: 'checklist',
        component: TrackerChecklistComponent
      },
      {
        path: 'location',
        component: TrackerLocationComponent
      },
      {
        path: 'control',
        component: TrackerControlComponent
      },
      {
        path:'',
        redirectTo: 'home',
        pathMatch:'full'
    }
    ]
  },
  
];
@NgModule({
  declarations: [TrackerChecklistComponent, TrackerStatusComponent, TrackerRouteComponent, TrackerLocationComponent, TrackerControlComponent, TrackerHomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot(),
  ]
})
export class TrackerModule { }
