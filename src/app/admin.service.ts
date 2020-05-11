import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {Specialty} from './admin-create-specialty/specialty';

const apiUrl = 'https://univer-sv-server.herokuapp.com/admin/';
//const apiUrl = 'http://localhost:8000/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getFutureTeachers(): Observable<any> {
    return this.http.get(apiUrl + 'futureTeachers');
  }

  createTeacher(formControl: FormControl) {
    const teacher = JSON.stringify(formControl.value);
    console.log(teacher);

    return this.http.post(apiUrl + 'createTeacher', JSON.parse(teacher));
  }

  getFutureStudents(): Observable<any> {
    return this.http.get(apiUrl + 'futureStudents');
  }

  confirmStudents(students: FormControl) {
    return this.http.post(apiUrl + 'confirmStudents', JSON.parse(JSON.stringify(students.value)));
  }

  createSpecialtyS(specialty: Specialty): Observable<Object> {
    return this.http.post(apiUrl + 'specialty', specialty);
  }

  getSpecialties(): Observable<any> {
    return this.http.get(apiUrl + 'specialties');
  }

}
