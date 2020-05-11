import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {User} from '../auth/user';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../admin.service';

@Component({
  selector: 'app-admin-set-students',
  templateUrl: './admin-set-students.component.html',
  styleUrls: ['./admin-set-students.component.css']
})
export class AdminSetStudentsComponent implements OnInit {

  users: User[];
  studentsForm = new FormControl('', [Validators.required]);

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdminSetStudentsComponent>,
    private adminService: AdminService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.adminService.getFutureStudents()
      .subscribe(data => {
        this.users = data;
        console.log(this.users);
        this.changeDetectorRefs.detectChanges();
      }, error => console.log(error));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmStudents(students: FormControl) {
    this.adminService.confirmStudents(students).subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.openSnackBar('Students was confirmed successfully', 'Ok');
      } else {
        this.errorAlert('Something went wrong', 'Ok');
      }
    });
    this.onNoClick();
  }

  errorAlert(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['red-snackbar']
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['blue-snackbar']
    });
  }

}

