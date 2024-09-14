import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }
  getProperty(id:number){
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p=> p.Id===id);
      })
    );
  }

  getAllProperties(SellRent?:number) : Observable<Property[]>{
   return this.http.get('data/properties.json').pipe(
    map(data => {      
      const propertiesArray : Array<Property> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp')!);
      if(localProperties){
        for(const id in localProperties){
          if(SellRent){
            if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent===SellRent){
              propertiesArray.push(localProperties[id]);
            }
          }
          else{
            propertiesArray.push(localProperties[id]);
          }
        }
      }
      if (Array.isArray(data)) {

        data.forEach(function (item) {
          if(SellRent){
            //console.log(item.SellRent);
            if(item.SellRent===SellRent)
              propertiesArray.push(item);
          }
          else{
            propertiesArray.push(item);
          }          
        });
    }
   // Not working below code from angular 9 in angular 16
      /* const propertiesArray : Array<any> = [];
      let id: keyof typeof data;
      for(id in data) {
        if(data.hasOwnProperty(id) && data[id].SellRent===SellRent){
           //data[id]; // no compiler error
           propertiesArray.push(data[id]);
        }
      }     */
      return propertiesArray;
    })
   );
   return this.http.get<Property[]>('data/properties.json');
  }
  
  addProperty(property: Property){
    let newProp = [property];
    // Add new property in array if newProp already exists in local storage
    if(localStorage.getItem('newProp')){
      newProp=[property,
        ...JSON.parse(localStorage.getItem('newProp')!)
      ]
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }
  newPropId(){
    if(localStorage.getItem('PID')){
      localStorage.setItem('PID',String(+localStorage.getItem('PID')!+1));
      return +localStorage.getItem('PID')!;
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }   
  }
}
