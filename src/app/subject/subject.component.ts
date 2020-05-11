import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SubjectService} from '../subject.service';
import {Subject} from './subject';
import {CreateSubjectComponent} from '../create-subject/create-subject.component';
import {ChangeTeacherComponent} from '../change-teacher/change-teacher.component';
import {Group} from '../group/group';
import {AddGroupToSubjectComponent} from '../add-group-to-subject/add-group-to-subject.component';
import {ViewGroupsInASubjectComponent} from '../view-groups-in-a-subject/view-groups-in-a-subject.component';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],

})
export class SubjectComponent implements OnInit {

  subject: Subject = new Subject();
  displayedColumns: string[] = ['id', 'name', 'teacherName', 'info'];
  groups: Group[];
  role: string;

  constructor(private _snackBar: MatSnackBar, private subjectService: SubjectService,
              private matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadTable();
    this.role = localStorage.getItem('Role');
  }

  loadTable() {
    this.subjectService.getAllSubject().subscribe(data => {
        console.log(data);
        this.subject = data;
        this.changeDetectorRefs.detectChanges();
      }, error => console.log(error));

    this.subjectService.getAllGroups().subscribe(data => {
        console.log(data);
        this.groups = data;
        this.changeDetectorRefs.detectChanges();
      }, error => console.log(error));

  }

  changeSubjectTeacher(subject: Subject) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    localStorage.setItem('subject', JSON.stringify(subject));
    this.matDialog.open(ChangeTeacherComponent, dialogConfig);

    this.loadTable();
  }

  addSubject() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '20%';

      this.matDialog.open(CreateSubjectComponent, dialogConfig);

    this.loadTable();
  }

  showGroups(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    localStorage.setItem('subjectIdToGroupComponent', JSON.stringify(id));

    this.matDialog.open(ViewGroupsInASubjectComponent, dialogConfig);
  }

  addGroupToSubject(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';
    localStorage.setItem('groupsToSubject', JSON.stringify(this.groups));
    localStorage.setItem('subjectIdToGroupComponent', JSON.stringify(id));

    this.matDialog.open(AddGroupToSubjectComponent, dialogConfig);

    this.loadTable();
  }
}
