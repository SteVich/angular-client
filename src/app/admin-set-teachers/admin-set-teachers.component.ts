import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {User} from '../auth/user';
import {AdminService} from '../admin.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-set-teachers',
  templateUrl: './admin-set-teachers.component.html',
  styleUrls: ['./admin-set-teachers.component.css']
})
export class AdminSetTeachersComponent implements OnInit {

  users: User[];
  teacherForm = new FormControl('', [Validators.required]);

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdminSetTeachersComponent>,
    private adminService: AdminService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.adminService.getFutureTeachers()
      .subscribe(data => {
        this.users = data;
        this.changeDetectorRefs.detectChanges();
      }, error => console.log(error));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createTeacher(teacher: FormControl) {
    this.adminService.createTeacher(teacher).subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.onNoClick();
        this.openSnackBar('Teacher was created successfully', 'Ok');
      } else {
        this.errorAlert('Something went wrong', 'Ok');
      }
    });
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

