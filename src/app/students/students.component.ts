import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {User} from '../auth/user';
import {GroupService} from '../group.service';
import {SetMarkComponent} from '../set-mark/set-mark.component';

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

  constructor(private _snackBar: MatSnackBar, private groupService: GroupService,
              private matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    const id = JSON.parse(localStorage.getItem('groupWithId'));
    this.groupName = JSON.parse(localStorage.getItem('groupName'));

    this.groupService.getAllStudentsFromGroup(id).subscribe(data => {
      this.students = data;
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
