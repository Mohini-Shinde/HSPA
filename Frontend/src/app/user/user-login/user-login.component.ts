import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
 //loginForm : FormGroup;
  constructor(private authService:AuthService,
    private alertify:AlertifyService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  onLogin(loginForm: NgForm){
    console.log(loginForm.value);
    this.authService.authUser(loginForm.value).subscribe(
      (response: any) =>{
        console.log(response);
        const user =response;
        console.log(user);
        localStorage.setItem('token',user.token);
        localStorage.setItem('userName',user.username);
        this.alertify.success("login successful!!")
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.alertify.error(error);
      }
    );

  }
}
