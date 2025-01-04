import { Injectable } from '@angular/core';
import { UserForRegister } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

constructor() { }
addUser(user: UserForRegister){
  /* let users = [];
  if(localStorage.getItem('Users')){
    console.log(localStorage.getItem('Users'));
    users=JSON.parse(localStorage.getItem('Users')!);
    users=[user,...users];
  }
  else{
    users=[user];
  }
  localStorage.setItem('Users',JSON.stringify(users)); */
}

}
