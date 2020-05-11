import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  isLoggedIn$ = false;
  userRole = null;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem("LoggedIn"))) {
      this.isLoggedIn$ = true;
    }
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('Role');
    localStorage.setItem('LoggedIn', 'false')
    this.isLoggedIn$ = false;
    this.router.navigate(['signin']);
  }

  home() {
    if (this.userRole === 'admin') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['subjects']);
    }
  }

  subjectsNavigation() {
    this.router.navigate(['subjects']);
  }

  groupsNavigation() {
    this.router.navigate(['groups']);
  }
}
