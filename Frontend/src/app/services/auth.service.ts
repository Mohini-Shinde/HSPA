import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
authUser(user:any){
  let userArray=[];
  if(localStorage.getItem('Users')){
    userArray=JSON.parse(localStorage.getItem('Users')!);
    //OR JSON.parse(localStorage.getItem('Users') as any);
  }
  
 // return userArray.find(p => p.userName===user.userName && p.password===user.password);
 return userArray.find((obj: {userName:string, password:string}) => obj.userName === user.userName && obj.password===user.password);
}
}
