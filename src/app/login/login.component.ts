import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

      username:String;
      password:String;

  constructor(
    private authService:AuthService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
      username:this.username,
      password:this.password,
    }
    this.authService.authendicateUser(user).subscribe(data =>{
      if(data.success){
        this.authService.storeUserData(data.token , data.user);
        //console.log(data.token);
        this.toastr.info('you are now login');
        console.log("you are now login");
        this.router.navigate(['/dashbord'])
      }
      else{
        this.toastr.error(data.msg);
        console.log(data.msg);
        this.router.navigate(['/login'])
      }
      
    });
  }
}
