import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {Group} from '../group/group';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  group: Group;

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    private groupService: GroupService,
  ) {
  }

  ngOnInit() {
    this.group = new Group();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup(group: Group) {
    if (group.name === undefined) {
      this.errorAlert('Please provide group name', 'Ok');
    } else {
      this.groupService.addGroup(group).subscribe(res => {
        if (res !== null) {
          this.onNoClick();
          this.openSnackBar('Group was created successfully', 'Ok');
          this.group = new Group();
        } else {
          this.errorAlert('Group is already exist', 'Ok');
        }
      });
    }
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
