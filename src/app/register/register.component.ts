import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;
  submitted = false;

  Firstname:String;
  Lastname:String;
  username:String;
  email:String;
  password:String;
  cnfPassword:String;
  name:String;

  constructor(
    private formBuilder: FormBuilder,
    private validateService:ValidateService,
    private authService:AuthService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
      this.register = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  onRegisterSubmit(){
    if(this.Firstname == undefined || this.Lastname == undefined){
      this.toastr.error('First name and Last name is required');
      return false;
    }
    this.name = this.Firstname.toString() +' '+ this.Lastname.toString();
    const user ={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password,
    }
    console.log(user);
    
    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      //console.log('Please fill in all fields');
      this.toastr.error('Please fill in all fields');
      return false;
    }

    // validate email

    if (!this.validateService.validateEmail(user.email)) {
      //console.log('Please use valid email');
      this.toastr.error('Please use valid email');
      return false;
    }
    if (!this.validateService.validatePassword(user.password,this.cnfPassword)) {
      //console.log('Password not match');
      this.toastr.error('Password not match');
      return false;
    }
    // Register user
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        //console.log("your now registerd");
        this.toastr.success('Your now registerd');
        this.router.navigate(['/login']);
      }
      else{
        //console.log("Something went wrong");
        this.toastr.error(data.msg);
        this.router.navigate(['/register']);
      }
    });
  }
  get f() { return this.register.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.register.invalid) {
        return;
    }

    alert('SUCCESS!! :-)')
}

}


