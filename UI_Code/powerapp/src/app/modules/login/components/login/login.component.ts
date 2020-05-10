import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { DOCUMENT } from '@angular/platform-browser';
@Component({templateUrl: 'login.component.html',
styleUrls:['./login.component.scss']})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        @Inject(DOCUMENT) private document: Document
        
    ) {
        
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.document.body.classList.add('login-body');
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] ;
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        
      
                   // this.router.navigate([this.returnUrl]);
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    const user = this.authenticationService.currentUserValue;
                    if(user.category == 'ttd'){
                      this.router.navigate([  'station']);
                    }
                    else{
                      this.router.navigate([  'smb']);
                    }
                    
                },
                error => {
                  // added temporarily
                  console.log('err',error)
                  this.alertService.error('username & password is incorrect')
                    this.loading = false;
                });
    }
}
