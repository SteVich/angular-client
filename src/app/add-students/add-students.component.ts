import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {GroupService} from '../group.service';
import {Group} from '../group/group';
import {User} from '../auth/user';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  group: Group;
  students: User[];
  studentsForm = new FormControl('', [Validators.required]);

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddStudentsComponent>,
    private groupService: GroupService,
  ) {
  }

  ngOnInit() {
    this.group = JSON.parse(localStorage.getItem('group'));

    this.groupService.getAllStudents().subscribe(data => {
      this.students = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addStudents(users: FormControl) {
    console.log(users);
    this.groupService.addStudents(users, this.group.id).subscribe();
    this.group = new Group();
    this.studentsForm = new FormControl('', [Validators.required]);
    this.onNoClick();
    this.openSnackBar('Students was added successfully', 'Ok');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['blue-snackbar']
    });
  }
}
