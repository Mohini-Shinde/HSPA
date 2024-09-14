import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/models/Iproperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent=1;
  properties : IProperty[]=[];
  constructor(private route:ActivatedRoute, private housingService:HousingService){

  }
  ngOnInit(): void {
    if(this.route.snapshot.url.toString()){
      this.SellRent=2;  // means we are on Rent property URL else we are on Base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(      
      data=>{
        this.properties=data;        
        console.log(data);
      },
      error=>{
        console.log(error);
      }
      
    );
  }
}
