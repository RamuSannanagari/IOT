import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerChecklistComponent } from './tracker-checklist/tracker-checklist.component';
import { Routes, RouterModule } from '@angular/router';
import { TrackerStatusComponent } from './tracker-status/tracker-status.component';
import { TrackerRouteComponent } from './tracker-route/tracker-route.component';
const routes: Routes = [
  {
    path: '',
    component: TrackerRouteComponent,
    children:[
      {
        path: 'tracker-status',
        component: TrackerStatusComponent
      },
      {
        path: 'tracker-checklist',
        component: TrackerChecklistComponent
      }
    ]
  },
  
];
@NgModule({
  declarations: [TrackerChecklistComponent, TrackerStatusComponent, TrackerRouteComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TrackerModule { }
