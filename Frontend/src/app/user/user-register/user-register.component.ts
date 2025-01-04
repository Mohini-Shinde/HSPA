import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserForRegister } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
 registrationForm : FormGroup;
 user:UserForRegister ;
 userSubmitted:boolean=false;
  constructor(private fb:FormBuilder,
    private authService: AuthService,
    private userService:UserServiceService,
    private alertify:AlertifyService
  ) { }

  ngOnInit() {
    /* this.registrationForm=new FormGroup({
      userName: new FormControl(null,Validators.required),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.minLength(8)]),
      confirmPassword: new FormControl(null,Validators.required),
      mobile: new FormControl(null,[Validators.required,Validators.maxLength(10)])
    },this.passwordMatchingValidator); */
    this.createRegistrationForm();
  }
  createRegistrationForm(){
    this.registrationForm = this.fb.group({
      userName: [null,Validators.required],
      email: [null,[Validators.required,Validators.email]],
      password: [null,[Validators.required,Validators.minLength(8)]],
      confirmPassword: [null,Validators.required],
      mobile: [null,[Validators.required,Validators.maxLength(10)]]
    },{Validators:this.passwordMatchingValidator});
  }
  /* passwordMatchingValidator(fg:FormGroup)  {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null :
    {notMatched:true};
  } */
    passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      return password?.value === confirmPassword?.value ? null : { notmatched: true };
    };
//Getter methods for all form controls
    get userName(){
      return this.registrationForm.get('userName') as FormControl;
    }
    get email(){
      return this.registrationForm.get('email') as FormControl;
    }
    get password(){
      return this.registrationForm.get('password') as FormControl;
    }
    get confirmPassword(){
      return this.registrationForm.get('confirmPassword') as FormControl;
    }
    get mobile(){
      return this.registrationForm.get('mobile') as FormControl;
    }
  onSubmit(){
    console.log(this.registrationForm.value);
    this.userSubmitted=true;
    if(this.registrationForm.valid){
      //this.user=Object.assign(this.user, this.registrationForm.value);   // Use Domain Models(user model) to map form data to model not user object directly like here did
      this.authService.registerUser(this.userData()).subscribe(()=>
        {
          this.onReset();
          this.alertify.success('User registered successfully');
        }
      );

    }
  }
  onReset(){
      this.registrationForm.reset();
      this.userSubmitted=false;
  }
  userData(): UserForRegister {
    return this.user={
      userName:this.userName.value,
      password: this.password.value,
      email:this.email.value,
      mobile:this.mobile.value,

    };
  }

}
