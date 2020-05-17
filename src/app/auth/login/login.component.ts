import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {AppComponent} from '../../app.component';
import {User} from '../user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

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
    let username = this.getUsername(form);
    let password = this.getPassword(form);

    this.authService.login(form).subscribe(data => {
      this.user = data[0];
      if (this.user !== undefined && this.user.username === username && this.user.password === password) {
        localStorage.setItem('LoggedIn', 'true');
        localStorage.setItem('Role', this.user.role);
        localStorage.setItem('UserId', this.user.id.toString());

        this.appComponent.isLoggedIn$ = true;
        this.appComponent.userRole = this.user.role;
        if (this.user.role === 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['subjects']);
        }
      } else {
        this.errorAlert('Bad credentials', 'Ok');
      }
    }, error => this.errorAlert('Bad credentials, please try again', 'Ok')
  );

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


