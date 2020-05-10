import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { DeviceViewComponent } from './components/device-view/device-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StreetLightComponent } from './street-light/street-light.component';
import { SolarWindmillPlantComponent } from './solar-windmill-plant/solar-windmill-plant.component';
import { DistributionTransformerComponent } from './distribution-transformer/distribution-transformer.component';
import { RouterModule } from '@angular/router';
import { SubStationRoutingModule } from './sub-station-routing.module';
import { NgxSelectModule } from 'ngx-select-ex';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [OverviewComponent, DeviceViewComponent,SolarWindmillPlantComponent,StreetLightComponent,DistributionTransformerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    RouterModule,
    SubStationRoutingModule,
    NgxSelectModule,
    BsDatepickerModule
  ],
  exports:[OverviewComponent, DeviceViewComponent,SolarWindmillPlantComponent,StreetLightComponent,DistributionTransformerComponent]
})
export class SubStationModule { }
