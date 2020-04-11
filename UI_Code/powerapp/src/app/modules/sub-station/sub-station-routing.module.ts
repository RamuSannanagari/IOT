import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { DistributionTransformerComponent } from './distribution-transformer/distribution-transformer.component';
import { StreetLightComponent } from './street-light/street-light.component';
import { SolarWindmillPlantComponent } from './solar-windmill-plant/solar-windmill-plant.component';



const routes: Routes = [{
    path: '',
    component: OverviewComponent,
    children:[{
      path:'device',
      component:DeviceViewComponent
    },{
        path:'distribution',
        component: DistributionTransformerComponent,
      },{
        path:'street-light',
        component: StreetLightComponent,
      },{
        path:'plant',
        component: SolarWindmillPlantComponent,
      },{
        path:'**',
        redirectTo:'\device'
    }]
  
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubStationRoutingModule { }
