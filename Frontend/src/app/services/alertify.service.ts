import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }
 success(message:string){
  return alertify.success(message);
 }
 warning(message:string){
  return alertify.warning(message);
 }
 error(message:string){
  return alertify.error(message);
 }

}
