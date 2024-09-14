import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  ngOnInit() {
  }
  loggedIn(){
    return localStorage.getItem('token');
  }
  onLogout(){
    localStorage.removeItem('token');
    this.alertify.success('Logged out successfully.')
  }
}
