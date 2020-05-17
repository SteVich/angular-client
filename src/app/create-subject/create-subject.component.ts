import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject} from '../subject/subject';
import {SubjectService} from '../subject.service';
import {Teacher} from '../subject/teacher';
import {User} from '../auth/user';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  newSubject: Subject;
  teachers: Teacher[];
  teacher: User = new User();

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateSubjectComponent>,
    private subjectService: SubjectService,
  ) {
  }

  ngOnInit() {
    this.newSubject = new Subject();
    this.subjectService.getAllTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createSubject(newSubject: Subject, teacher: User) {
    if (newSubject.subjectName === undefined) {
      this.errorAlert('Please provide subject name', 'Ok');
    } else if (newSubject.teacher === undefined) {
      this.errorAlert('Please set teacher', 'Ok');
    } else {
      newSubject.teacher = teacher;
      this.subjectService.addSubject(newSubject).subscribe(res => {
        console.log(res);
        if (res !== null) {
          this.onNoClick();
          this.openSnackBar('Subject was added successfully', 'Ok');
          this.newSubject = new Subject();
        } else {
          this.errorAlert('Subject is already exist', 'Ok');
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
