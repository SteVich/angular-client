import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subject} from './subject/subject';
import {FormControl} from '@angular/forms';
import {Group} from './group/group';
import {Teacher} from './subject/teacher';

const apiUrl = 'https://univer-sv-server.herokuapp.com/';
// const apiUrl = 'http://localhost:8000/';

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

  changeTeacherService(teacherForm: FormControl, id: number): Observable<Object> {
    const value = JSON.stringify(teacherForm.value);
    const teacher = new Teacher();
    teacher.name = JSON.parse(value);
    const subject = new Subject();
    subject.id = id;
    subject.teacher = JSON.parse(value);

    return this.http.post(apiUrl + 'subject/' + id, subject);
  }

  getAllGroups(): Observable<any> {
    return this.http.get(apiUrl + 'groups');
  }

  addGroupToSubject(group: FormControl, id: any): Observable<Object> {
    const value = JSON.stringify(group.value);
    let groupChange = new Group();

    groupChange = JSON.parse(value);
    groupChange.subjectId = id;

    return this.http.post(apiUrl + 'addGroupToSubject', groupChange);
  }

  getAllGroupsFromSubject(id: any): Observable<any> {
    return this.http.get(apiUrl + 'groupsFromSubject/' + id);
  }

}
