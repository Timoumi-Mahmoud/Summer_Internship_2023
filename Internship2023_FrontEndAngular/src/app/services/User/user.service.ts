import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Router} from "@angular/router";




@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private  router: Router) {}


  public SetPlayload(decoded: string){
    localStorage.setItem("decoded", JSON.stringify(decoded) )
  }

  public  setToken(token:string){
    localStorage.setItem("Token", token)
  }

  public setRole(roleOfCurrentUser:string){
    localStorage.setItem("roleOfCurrentUser", JSON.stringify(roleOfCurrentUser));
  }




  public getToken(): string {
    const token = localStorage.getItem("token");
    if (token === null) {
      throw new Error("jwtToken is null");
    }
    return token;
  }
  public getRoles(): string[] {
    const rolesJson = localStorage.getItem('roleOfCurrentUser');
    const roles = rolesJson ? JSON.parse(rolesJson) : [];
    console.log("the roles form getRoles: is :     "+roles);
    return roles;
  }


  public getPlayload(){
    const playload= localStorage.getItem("decoded")
    console.log(playload)
  }


  public clear(){
    localStorage.clear();
    // this.router.navigateByUrl('/login');
    this.router.navigate(['/login']);

  }




  public isLoggedIn(): boolean {
    const token = this.getToken();
    const roles = this.getRoles();
    return !!(token && roles);
  }










  public getUserID(): any {
    let id = localStorage.getItem("id");
   // console.log(JSON.parse(id)   )

   return id;
  }

  public setID(id:string){

    localStorage.setItem("id", id)
  }




  signout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }









}
