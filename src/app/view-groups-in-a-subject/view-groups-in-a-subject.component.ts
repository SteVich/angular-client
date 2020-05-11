import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {Group} from '../group/group';
import {SubjectService} from '../subject.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-groups-in-a-subject',
  templateUrl: './view-groups-in-a-subject.component.html',
  styleUrls: ['./view-groups-in-a-subject.component.css']
})
export class ViewGroupsInASubjectComponent implements OnInit {
  groups: Group[];

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewGroupsInASubjectComponent>,
    private subjectService: SubjectService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const id = JSON.parse(localStorage.getItem('subjectIdToGroupComponent'));

    console.log(id);
    this.subjectService.getAllGroupsFromSubject(id).subscribe(data => {
      console.log(data);
      this.groups = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  viewMembers(id: any, name: string) {
    localStorage.setItem('groupWithId', JSON.stringify(id));
    localStorage.setItem('groupName', JSON.stringify(name));
    this.router.navigate(['group']);
    this.dialogRef.close();
  }

}
