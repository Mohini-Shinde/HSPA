import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId : number=0;
  property= new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(private route:ActivatedRoute, private router:Router,
    private housingService:HousingService
  ) { }

  ngOnInit() {
    this.propertyId = Number(this.route.snapshot.params['id']);
    this.route.data.subscribe(
      (data: any) => {
        this.property=data['prp'];
      }
    );
    /* this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];        
        this.housingService.getProperty(this.propertyId).subscribe(
          (data : any) => {
            if(data){
              this.property=data;
              console.log(this.property.Image);
            }            
          },
          error=> this.router.navigate(['/'])
        );
      }
    ); */

    this.galleryOptions = [
      {
        width: '100%',
        height: '460px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/internal-1.jpg',
        medium: 'assets/images/internal-1.jpg',
        big: 'assets/images/internal-1.jpg'
      },
      {
        small: 'assets/images/internal-2.jpg',
        medium: 'assets/images/internal-2.jpg',
        big: 'assets/images/internal-2.jpg'
      },
      {
        small: 'assets/images/internal-3.jpg',
        medium: 'assets/images/internal-3.jpg',
        big: 'assets/images/internal-3.jpg'
      },{
        small: 'assets/images/internal-4.jpg',
        medium: 'assets/images/internal-4.jpg',
        big: 'assets/images/internal-4.jpg'
      },
      {
        small: 'assets/images/internal-5.jpg',
        medium: 'assets/images/internal-5.jpg',
        big: 'assets/images/internal-5.jpg'
      }
    ];

  }  
}
