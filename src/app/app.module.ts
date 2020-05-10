import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';
import {BidiModule} from '@angular/cdk/bidi';
import {PortalModule} from '@angular/cdk/portal';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkTableModule} from '@angular/cdk/table';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {SubjectComponent} from './subject/subject.component';
import {CreateSubjectComponent} from './create-subject/create-subject.component';
import {ChangeTeacherComponent} from './change-teacher/change-teacher.component';
import {GroupComponent} from './group/group.component';
import {CreateGroupComponent} from './create-group/create-group.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {AddStudentsComponent} from './add-students/add-students.component';
import {AdminSetTeachersComponent} from './admin-set-teachers/admin-set-teachers.component';
import {AdminSetStudentsComponent} from './admin-set-students/admin-set-students.component';
import { AdminCreateSpecialtyComponent } from './admin-create-specialty/admin-create-specialty.component';
import { AddGroupToSubjectComponent } from './add-group-to-subject/add-group-to-subject.component';
import { ViewGroupsInASubjectComponent } from './view-groups-in-a-subject/view-groups-in-a-subject.component';
import { StudentsComponent } from './students/students.component';
import { SetMarkComponent } from './set-mark/set-mark.component';

@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmationDialogComponent,
    AdminPanelComponent,
    SubjectComponent,
    CreateSubjectComponent,
    ChangeTeacherComponent,
    GroupComponent,
    CreateGroupComponent,
    EditProfileComponent,
    AddStudentsComponent,
    AdminSetTeachersComponent,
    AdminSetStudentsComponent,
    AdminCreateSpecialtyComponent,
    AddGroupToSubjectComponent,
    ViewGroupsInASubjectComponent,
    StudentsComponent,
    SetMarkComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTableModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatStepperModule,
    CdkTableModule,
    A11yModule,
    BidiModule,
    OverlayModule,
    PortalModule,

  ],
  bootstrap: [AppComponent],
  entryComponents: [CreateSubjectComponent, ChangeTeacherComponent, CreateGroupComponent,
    AddStudentsComponent, AdminSetTeachersComponent, AdminSetStudentsComponent, AdminCreateSpecialtyComponent,
    AddGroupToSubjectComponent, ViewGroupsInASubjectComponent, SetMarkComponent]
})
export class AppModule {
}

