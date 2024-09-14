import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/models/IPropertybase';
import { Property } from 'src/app/models/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';
@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
//@ViewChild('Form') addPropertyForm : NgForm;  //TemplateDriven to be accessed in code
@ViewChild('formTabs', { static: false }) formTabs?: TabsetComponent;
addPropertyForm :FormGroup;
nextClicked:boolean;

property= new Property();


//Will come from Masters
propertyTypes:Array<string>=['House','Apartment','Duplex'];
furnishTypes:Array<string>=['Fully','Semi','Unfurnished'];
initVar : any=null;
propertyView : IPropertyBase={
  Id:this.initVar,
  Name:'',
  SellRent:this.initVar,
  PType:'',
  FType:'',
  Price:this.initVar,
  BHK:this.initVar,
  BuiltArea:this.initVar,
  City:'',
  RTM:this.initVar,
  Posession:''
};

  constructor(private fb:FormBuilder, private router:Router,
    private housingService: HousingService, private alertify:AlertifyService
  ) { }

  ngOnInit() {
    this.CreateAddPropertyForm();
  }
  CreateAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
          SellRent: ['1' , Validators.required],
          BHK: [null, Validators.required],
          PType: [null, Validators.required],
          FType: [null, Validators.required],
          Name: [null, Validators.required],
          City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
          Price: [null, Validators.required],
          BuiltArea: [null, Validators.required],
          CarpetArea: [null],
          Security: [0],
          Maintenance: [0],
      }),

      AddressInfo: this.fb.group({
          FloorNo: [null],
          TotalFloor: [null],
          Address: [null, Validators.required],
          LandMark: [null],
      }),

      OtherInfo: this.fb.group({
          RTM: [null, Validators.required],
          PossessionOn: [null, Validators.required],
          AOP: [null],
          Gated: [null],
          MainEntrance: [null],
          Description: [null]
      })
  });
  }
  // #region <Getter Methods>
    // #region <FormGroups>
    get BasicInfo() {
      return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PriceInfo() {
      return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
      return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
      return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  // #endregion

  // #region <Form Controls>
  get SellRent() {
      return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
      return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get PType() {
      return this.BasicInfo.controls['PType'] as FormControl;
  }

  get FType() {
      return this.BasicInfo.controls['FType'] as FormControl;
  }

  get Name() {
      return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City() {
      return this.BasicInfo.controls['City'] as FormControl;
  }

  get Price() {
      return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
      return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
      return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
      return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
      return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
      return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
      return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
      return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
      return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
      return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
      return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
      return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
      return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
      return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
      return this.OtherInfo.controls['Description'] as FormControl;
  }

  // #endregion
  // #endregion
  selectTab(nextTabId: number, IsCurrentTabValid: boolean) {  
    console.log(IsCurrentTabValid);
    console.log(this.BasicInfo.value);
    this.nextClicked=true;
    if(IsCurrentTabValid){
      if (this.formTabs?.tabs[nextTabId]) {
        this.formTabs.tabs[nextTabId].active = true;        
      }
    }    
  }
  onBack(){
    this.router.navigate(['/']);
  }
  
  onSubmit(){
    this.nextClicked=true;
    if(this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Success');
      console.log(this.addPropertyForm);
      if(this.SellRent.value==='2'){
        this.router.navigate(['/rent-property']);
      }
      else{
        this.router.navigate(['/']);
      }
    }
    else{
        this.alertify.error('Review');
    }    
  }
  mapProperty(): void{
    this.property.Id=this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.security = this.Security.value;
    this.property.maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.carpetArea = this.CarpetArea.value;
    this.property.floorNo = this.FloorNo.value;
    this.property.totalFloors = this.TotalFloor.value;
    this.property.address = this.Address.value;
    this.property.address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.gated = this.Gated.value;
    this.property.mainEntrance = this.MainEntrance.value;
    this.property.Posession =this.PossessionOn.value;
    this.property.description = this.Description.value;
    this.property.PostedOn =new Date().toString();
  }
  allTabsValid(): boolean {
    if (this.BasicInfo.invalid && this.formTabs?.tabs[0]) {
        this.formTabs.tabs[0].active = true;
        return false;
    }

    if (this.PriceInfo.invalid && this.formTabs?.tabs[1]) {
        this.formTabs.tabs[1].active = true;
        return false;
    }

    if (this.AddressInfo.invalid && this.formTabs?.tabs[2]) {
        this.formTabs.tabs[2].active = true;
        return false;
    }

    if (this.OtherInfo.invalid && this.formTabs?.tabs[3]) {
        this.formTabs.tabs[3].active = true;
        return false;
    }
    return true;
}

}
