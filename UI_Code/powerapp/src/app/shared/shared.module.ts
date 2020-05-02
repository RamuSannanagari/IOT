import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { AlertComponent } from './component/alert/alert.component';
import { SubStationModule } from '../modules/sub-station/sub-station.module';
import { LoaderComponent } from './component/loader/loader.component';


@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, AlertComponent, LoaderComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    SubStationModule
    
  ],
  exports:[HeaderComponent,PageNotFoundComponent,AlertComponent,LoaderComponent]
})
export class SharedModule { }
