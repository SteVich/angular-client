import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Group} from './group';
import {Student} from './student';
import {GroupService} from '../group.service';
import {CreateGroupComponent} from '../create-group/create-group.component';
import {AddStudentsComponent} from '../add-students/add-students.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  group: Group = new Group();
  displayedColumns: string[] = ['id', 'name', 'members', 'actions'];
  students: Student[];
  role: string;

  constructor(private _snackBar: MatSnackBar, private groupService: GroupService, private router: Router,
              private matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.loadTable();
    this.role = localStorage.getItem('Role');
  }

  loadTable() {
    this.groupService.getAllGroups()
      .subscribe(data => {
        this.group = data;
        this.changeDetectorRefs.detectChanges();
      }, error => console.log(error));
  }

  addStudent(group: Group) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    localStorage.setItem('group', JSON.stringify(group));

    this.matDialog.open(AddStudentsComponent, dialogConfig);

    this.loadTable();
  }

  addGroup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    this.matDialog.open(CreateGroupComponent, dialogConfig);

    this.loadTable();
  }

  viewStudents(row: any) {
    localStorage.setItem('groupWithId', JSON.stringify(row.id));
    localStorage.setItem('groupName', JSON.stringify(row.name));
    this.router.navigate(['group']);
  }
}
