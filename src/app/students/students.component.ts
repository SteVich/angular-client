import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {User} from '../auth/user';
import {GroupService} from '../group.service';
import {SetMarkComponent} from '../set-mark/set-mark.component';
import {Specialty} from '../admin-create-specialty/specialty';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'course', 'specialty', 'mark', 'updateMark'];
  students: User[];
  groupName: string;
  role: string;
  isThisTeacher: boolean;

  constructor(private _snackBar: MatSnackBar, private groupService: GroupService,
              private matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    const id = JSON.parse(localStorage.getItem('groupWithId'));
    this.groupName = JSON.parse(localStorage.getItem('groupName'));
    const teacherId = JSON.parse(localStorage.getItem('teacherID'));

    this.groupService.getAllStudentsFromGroup(id).subscribe(data => {
      this.students = data;

      this.students.forEach(x => {
        var specialty = new Specialty();
        specialty = JSON.parse(x.specialty);
        console.log(specialty);
        x.specialty = specialty.name;
      });

      this.changeDetectorRefs.detectChanges();
    }, error => console.log(error));

    this.role = localStorage.getItem('Role');
  }

  changeStudentMark(student: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    localStorage.setItem('student', JSON.stringify(student));

    this.matDialog.open(SetMarkComponent, dialogConfig);

    this.loadTable();
  }

}
