import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken :any;
  user:any;

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Cotent-type','application/json');
    return this.http.post('http://localhost:3000/users/register',user,{headers: headers}) //http://localhost:3000/
      .pipe(map(res => res.json()));
  }
  authendicateUser(user){
    let headers = new Headers();
    headers.append('Cotent-type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate',user,{headers: headers}) //http://localhost:3000/
      .pipe(map(res => res.json()));
  }
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization' , this.authToken)
    headers.append('Cotent-type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers: headers}) //http://localhost:3000/
      .pipe(map(res => res.json()));
  }
  storeUserData(token , user){
    localStorage.setItem('id_token' , token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  loggedIn(){
    this.loadToken();
  return helper.isTokenExpired(this.authToken);
    //return true;
  }
  logout(){
    this.authToken =null;
    this.user =null;
    localStorage.clear();
  }
  loadToken(){
    const token = localStorage.getItem('id_token')
    this.authToken = token;
  }
}