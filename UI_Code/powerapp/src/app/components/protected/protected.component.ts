import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  user:User;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.authenticationService.currentUserValue;
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
