import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule} from '@angular/material/menu';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService} from'./auth.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard} from './guards/auth.guard';
import { HttpModule } from '@angular/http';
import { ValidateService} from './validate.service';
import { CashierComponent } from './cashier/cashier.component';


@NgModule({ 
  declarations: [
    
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NavbarComponent, 
    RegisterComponent, CashierComponent
  ],
  imports: [
    ReactiveFormsModule ,
    BrowserModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    HttpModule,
    MatButtonModule, MatCheckboxModule,
    NgbModule.forRoot(),
    CarouselModule.forRoot(),
    FormsModule,
    RouterModule.forRoot([
     
      {path: 'login',component: LoginComponent},
      {path: 'admin',component:AdminComponent},
      {path: 'register',component: RegisterComponent},
      {path: 'cashier',component: CashierComponent},    
      {path: '', component: HomeComponent}, 
    ]),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      }) // ToastrModule added
  
  ],
  providers: [ValidateService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
 