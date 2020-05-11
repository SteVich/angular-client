import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {User} from '../auth/user';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {AppComponent} from '../app.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  loginForm: FormGroup;
  usernameOrEmail = '';
  password = '';
  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  user: User = new User();

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,
              private appComponent: AppComponent, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    localStorage.setItem('LoggedIn', 'false');
    this.loginForm = this.formBuilder.group({
      'usernameOrEmail': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    const username = this.getUsername(form);
    const password = this.getPassword(form);

    this.authService.login(form).subscribe(data => {
      this.user = data[0];

      if (this.user.username === username && this.user.password === password) {
        localStorage.setItem('LoggedIn', 'true');
        this.appComponent.isLoggedIn$ = true;
        this.router.navigate(['tables']);
      } else {
        this.errorAlert('Bad credentials, please try again', 'Ok');
      }
    }, error => console.log(error));

  }

  errorAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['red-snackbar']
    });
  }

  getUsername(data: any): String {
    return data.usernameOrEmail;
  }

  getPassword(data: any): String {
    return data.password;
  }

  register() {
    this.router.navigate(['signup']);
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

