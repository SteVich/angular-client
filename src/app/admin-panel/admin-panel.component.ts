import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';
import {AdminSetTeachersComponent} from '../admin-set-teachers/admin-set-teachers.component';
import {AdminSetStudentsComponent} from '../admin-set-students/admin-set-students.component';
import {AdminCreateSpecialtyComponent} from '../admin-create-specialty/admin-create-specialty.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {


  constructor(private _snackBar: MatSnackBar, private router: Router, private adminService: AdminService,
              private matDialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  subjects() {
    this.router.navigate(['subjects']);
  }

  groups() {
    this.router.navigate(['groups']);
  }

  setTeacher() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    this.matDialog.open(AdminSetTeachersComponent, dialogConfig);

  }

  confirmStudents() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    this.matDialog.open(AdminSetStudentsComponent, dialogConfig);
  }

  createSpecialty() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '20%';

    this.matDialog.open(AdminCreateSpecialtyComponent, dialogConfig);
  }
}

