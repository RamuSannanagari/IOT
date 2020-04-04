import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './component/header/header.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { AlertComponent } from './component/alert/alert.component';

@NgModule({
  declarations: [HeaderComponent, PageNotFoundComponent, AlertComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports:[HeaderComponent,PageNotFoundComponent,AlertComponent]
})
export class SharedModule { }
