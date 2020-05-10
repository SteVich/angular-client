import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "./subject/subject";
import {FormControl} from "@angular/forms";
import {Group} from "./group/group";

const apiUrl = 'https://univer-sv-server.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) {
  }

  getAllSubject(): Observable<any> {
    return this.http.get(apiUrl + 'subjects');
  }

  addSubject(subject: Subject): Observable<Object> {
    return this.http.post(apiUrl + 'subject', subject);
  }

  getAllTeachers(): Observable<any> {
    return this.http.get(apiUrl + 'subject/teachers');
  }

  getTeacherById(id: number): Observable<any> {
    return this.http.get(apiUrl + 'teachers/' + id);
  }

  changeTeacherService(subject: Subject, id: number): Observable<Object> {
    return this.http.post(apiUrl + 'subject/' + id, subject);
  }

  getAllGroups(): Observable<any> {
    return this.http.get(apiUrl + 'groups');
  }

  addGroupToSubject(group: FormControl, id: any, groupId: any): Observable<Object> {
    let value = JSON.stringify(group.value);
    let groupChange = new Group();
    groupChange.subjectId = id;
    groupChange = JSON.parse(value);
    return this.http.post(apiUrl + 'addGroupToSubject', JSON.stringify(groupChange));
  }

  getAllGroupsFromSubject(id:any): Observable<any> {
    return this.http.get(apiUrl + 'groupsFromSubject', id);
  }

}
