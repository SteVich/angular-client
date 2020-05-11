import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {Group} from '../group/group';
import {SubjectService} from '../subject.service';

@Component({
  selector: 'app-add-group-to-subject',
  templateUrl: './add-group-to-subject.component.html',
  styleUrls: ['./add-group-to-subject.component.css']
})
export class AddGroupToSubjectComponent implements OnInit {

  groups: Group[];
  id: number;
  groupForm = new FormControl('', [Validators.required]);

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddGroupToSubjectComponent>,
    private subjectService: SubjectService,
  ) {
  }

  ngOnInit() {
   this.groups = JSON.parse(localStorage.getItem('groupsToSubject'));
   this.id = JSON.parse(localStorage.getItem('subjectIdToGroupComponent'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addGroup(group: FormControl) {
    this.subjectService.addGroupToSubject(group, this.id).subscribe(res => {
      if (res !== null) {
        this.onNoClick();
        this.openSnackBar('Group was added successfully', 'Ok');
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


