import {Component, Inject, OnInit} from '@angular/core';
// import {loginRequest} from "./loginRequest";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {HttpInterceptor} from "@angular/common/http";
import {FormControl, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {UserService} from "../../../../services/User/user.service";
import {AuthService} from "../../../../services/User/auth.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DatePipe, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MyErrorStateMatcher} from "../../../../modeles/utlis/my-error-state-matcher";
const ROLE_USER = 'ROLE_USER';
const ROLE_ADMIN = 'ROLE_ADMIN';
const AUTH_API = 'http://localhost:3000';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  showPassword: boolean = false;
  constructor( private userS: UserService,  private authService: AuthService,  private router:Router, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.RedirectBasedOnLoginOrNotAndRole()
    this.logout()
  }
  public login(){
    const { email, password } = this.form;
    this.authService.Login(email, password).subscribe(
      (response : any)=>{
        this.userS.SetPlayload(response.decoded);
        this.userS.setToken(response.token)
        this.userS.setRole(response.roleOfCurrentUser)
        this.userS.getRoles()
        this.userS.setID(response.id)
        const role=  this.userS.getRoles();


        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome back again to our platform',
          showConfirmButton: false,
          timer: 1500
        })
        if(role.includes('USER')){
          this.router.navigate(['/userPage']);
        }else {
           this.router.navigate(['/adminPage']);

       }
        },
      (error)=>{
        Swal.fire("Error", "There is some error please verify your input and your account is active !");
      }
    )
  }



  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showHidePassword() {
    this.showPassword = !this.showPassword;
  }


  isUserLogedIn(){
    if(this.authService.isLoggedIn()){
      return true
    }else {
      return false
    }
  }


  RedirectBasedOnLoginOrNotAndRole(){
    if(this.isUserLogedIn()){
      const role=  this.userS.getRoles();
      if(role.includes('USER')){
        this.router.navigate(['/userPage']);
      }else {
        this.router.navigate(['/adminPage']);

      }
    }

  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])

  }



  openDialog() {
    this.dialog.open(ForgetPasswordDialog
      , {
      data: {
        animal: 'panda'
      }
    });
  }
}

@Component({
  selector: 'forget-password-dialog',
  templateUrl: 'forgetPasswordDialog.html',
  standalone: true,

  imports: [MatDialogModule, NgIf, DatePipe, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
})
export class ForgetPasswordDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private  authService: AuthService) {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  sendResetPasswordLink(forum:any){
    this.authService.SendForgetPWDLink(forum.value).subscribe(
        res=>{
          Swal.fire(
            'Reset password link have been sent !',
            ' please check you email box!',
            'success'
          )
        },
        err=>{
          alert("some error has occurred ! ")
        })

  }
}



