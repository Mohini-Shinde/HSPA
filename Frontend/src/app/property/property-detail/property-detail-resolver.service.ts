import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private router:Router, private housingService : HousingService) { }
  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) : Observable<Property> | Property 
  {
    const propId=route.params['id'];
    let prop :any =this.housingService.getProperty(+propId).pipe(
      catchError(error =>{
        this.router.navigate(['/'])
        return of(null);
      } 
      )
    );
    return prop;
  }

}
