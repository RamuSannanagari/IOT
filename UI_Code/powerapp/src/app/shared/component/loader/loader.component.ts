import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  loading: boolean = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) {
  }
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: any) => {
      this.loading = state.show;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
