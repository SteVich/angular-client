import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {Specialty} from "./admin-create-specialty/specialty";

const apiUrl = 'https://univer-sv-server.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getFutureTeachers(): Observable<any> {
    return this.http.get(apiUrl + 'futureTeachers');
  }

  createTeacher(teacher: FormControl) {
    return this.http.post(apiUrl + 'createTeacher', JSON.stringify(teacher.value));
  }

  getFutureStudents(): Observable<any> {
    return this.http.get(apiUrl + 'futureStudents');
  }

  confirmStudents(students: FormControl) {
    return this.http.post(apiUrl + 'confirmStudents', JSON.stringify(students.value));
  }

  createSpecialtyS(specialty: Specialty) : Observable<Object> {
    return this.http.post(apiUrl + 'specialty', specialty);
  }

  getSpecialties(): Observable<any> {
    return this.http.get(apiUrl + 'specialties');
  }

}
