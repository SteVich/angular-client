import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "./group/group";
import {FormControl} from "@angular/forms";

const apiUrl = 'https://univer-sv-server.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  getAllGroups(): Observable<any> {
    return this.http.get(apiUrl + 'groups');
  }

  addGroup(group: Group): Observable<Object> {
    return this.http.post(apiUrl + 'group', group);
  }

  getAllStudents(): Observable<any> {
    return this.http.get(apiUrl + 'allStudents');
  }

  addStudents(users: FormControl, id: any) {
    let usersFromForm = JSON.stringify(users.value);
    let groupChange = new Group();
    groupChange.id = id;
    groupChange.students = JSON.parse(usersFromForm);
    return this.http.post(apiUrl + 'group/' + id, groupChange);
  }

  getAllStudentsFromGroup(id:any): Observable<any> {
    return this.http.get(apiUrl + 'allStudentsFromGroup', id);
  }

  updateMark(student:any): Observable<any> {
    return this.http.put(apiUrl + 'updateStudentMark', student);
  }
}
