import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ProtectedComponent } from './components/protected/protected.component';
import { LoaderIntercepterService } from './interceptors/loader-intercepter.service';
import { NgxSelectModule } from 'ngx-select-ex';
@NgModule({
    declarations: [
        AppComponent,
        ProtectedComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        NgxChartsModule,
        SharedModule,
        NgxSelectModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: LoaderIntercepterService, multi: true }
  
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
