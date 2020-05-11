import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {User} from '../user';
import {Specialty} from '../../admin-create-specialty/specialty';
import {AdminService} from '../../admin.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  registerForm: FormGroup;
  email = '';
  username = '';
  name = '';
  password = '';
  isTeacher = false;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  specialties: Specialty[];

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,
              private _snackBar: MatSnackBar, private adminService: AdminService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'username': [null, Validators.required],
      'name': [null, Validators.required],
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'isTeacher': [false],
      'specialty': [null],
      'course': [null],
      'role': 'student'
    });

    this.adminService.getSpecialties().subscribe(data => {
      this.specialties = data;
    }, error => console.log(error));
  }

  onFormSubmit(form: NgForm) {
    let user = new User();
    user = JSON.parse(JSON.stringify(form));
    console.log(user.specialty);
    console.log(user.course);
    if (user.isTeacher === false && user.specialty === null) {
      this.errorAlert('Specialty does not set', 'Ok');
    } else if (user.isTeacher === false && user.course === null) {
      this.errorAlert('Course does not set', 'Ok');
    } else {
      this.authService.register(form)
        .subscribe(res => {
          if (res !== null) {
            this.successAlert('You have been registered successfully', 'Ok');
            setTimeout(() => {
              this.router.navigate(['signin']);
            }, 1000);
          } else {
            this.errorAlert('Something is incorrect', 'Ok');
          }
        }, (err) => {
          this.errorAlert('Something is incorrect', 'Ok');
        });
    }

  }

  successAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });
  }

  errorAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
