import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../admin.service';
import {Specialty} from './specialty';

@Component({
  selector: 'app-admin-create-specialty',
  templateUrl: './admin-create-specialty.component.html',
  styleUrls: ['./admin-create-specialty.component.css']
})
export class AdminCreateSpecialtyComponent implements OnInit {

  specialty: Specialty;

  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AdminCreateSpecialtyComponent>,
    private adminService: AdminService,
  ) {
  }

  ngOnInit() {
    this.specialty = new Specialty();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createSpecialty(specialty: Specialty) {
    if (specialty.name === undefined) {
      this.errorAlert('Please provide specialty', 'Ok');
    } else {
      this.adminService.createSpecialtyS(specialty).subscribe(res => {
        if (res !== null) {
          this.onNoClick();
          this.openSnackBar('Specialty was created successfully', 'Ok');
          this.specialty = new Specialty();
        } else {
          this.errorAlert('Specialty is already exist', 'Ok');
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
