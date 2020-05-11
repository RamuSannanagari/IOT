import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantViewComponent } from './plant-view/plant-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PlantViewComponent
    
  }]

@NgModule({
  declarations: [PlantViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PlantViewModule { }
