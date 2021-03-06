import {Component, OnInit} from '@angular/core';
import {Teacher} from '../subject/teacher';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {SubjectService} from '../subject.service';
import {Subject} from '../subject/subject';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-teacher',
  templateUrl: './change-teacher.component.html',
  styleUrls: ['./change-teacher.component.css']
})
export class ChangeTeacherComponent implements OnInit {

  teachers: Teacher[];
  subject: Subject;
  teacherForm = new FormControl('', [Validators.required]);

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangeTeacherComponent>,
    private subjectService: SubjectService,
  ) {
  }

  ngOnInit() {
    this.subject = JSON.parse(localStorage.getItem('subject'));

    this.subjectService.getAllTeachers().subscribe(data => {
      this.teachers = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeTeacher(teacherForm: FormControl) {
    this.subjectService.changeTeacherService(teacherForm, this.subject.id).subscribe(res => {
      if (res !== null) {
        this.onNoClick();
        this.openSnackBar('Teacher was changed successfully', 'Ok');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['blue-snackbar']
    });
  }
}
