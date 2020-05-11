import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {GroupService} from '../group.service';
import {User} from '../auth/user';

@Component({
  selector: 'app-set-mark',
  templateUrl: './set-mark.component.html',
  styleUrls: ['./set-mark.component.css']
})
export class SetMarkComponent implements OnInit {

  user: User;

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SetMarkComponent>,
    private groupService: GroupService,
  ) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('student'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateMark(student: any) {
    this.groupService.updateMark(student).subscribe(res => {
      console.log(res);
      if (res !== null) {
        this.onNoClick();
        this.openSnackBar('Mark was updated successfully', 'Ok');
      } else {
        this.errorAlert('Something went wrong', 'Try again');
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
