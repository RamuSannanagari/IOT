import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  navigate(){
    const user = this.authenticationService.currentUserValue;
    if(user.category == 'ttd'){
      this.router.navigate([  'overview']);
    }
    else{
      this.router.navigate([  'smb']);
    }
  }

}
