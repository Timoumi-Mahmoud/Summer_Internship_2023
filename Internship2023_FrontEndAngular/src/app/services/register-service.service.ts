import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {Register} from "../components/userComponents/sharedComponents/register/register.component";
const baseURL = `http://localhost:3000`

import {catchError, map} from 'rxjs/operators';
import {NgForm} from "@angular/forms";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {
  constructor(private http: HttpClient, private router: Router) {
  }


  registerNewUser(register: Register): Observable<any> {
    return this.http.post(
        '/api/register',
      register,
      httpOptions
    );
  }

  SendVerificationEmail(email: string): Observable<any> {
    return this.http.post(
      '/api/sendActivationAccountEmail/'+email,
      email,
      httpOptions
    );
  }



  SendVificationEmail(email:string){  return this.http.post<any>(  '/api/sendActivationAccountEmail/'+email,
    {headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'}).pipe(map((resp) => {
    return resp;
  }));
  }




  AccepteVirficationEmail(email: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = {headers: headers, responseType: 'text' as 'json'};
    console.log(email)
    return this.http.put<any>(`/api/activateAccount?email=`+email, {}, options).pipe(
      map((resp) => {
        return resp;
      }),
      catchError((err) => {
        console.log(err); // log the error object to the console
        return throwError(err);
      })
    );
  }




  // SendForgetPWD(email: NgForm) {
  //   console.log(email);
  //   return this.http.post<any>(AUTH_API + 'public/user/forgot_password/?email=' + email,
  //     {
  //       headers: new HttpHeaders({'Content-Type': 'application/json'}),
  //       responseType: 'text' as 'json'
  //     }).pipe(map((resp) => {
  //     return resp;
  //   }));
  // }


  registerNewUserTwo(fd : any,password:string, email:string, image :File):Observable<any>{
    const formData = new FormData();
    console.log(fd)
    formData.append('user', JSON.stringify(fd));
    console.log(formData)
    formData.append('password', password);
    formData.append('email', email);


    formData.append('image', image, image.name);
    console.log(formData)

    return this.http.post('/api/register',formData);
  }


  registerNewUserThree(firstName:string, lastName:string, email:string, password:string,gender:string,department:string, phoneNumber:string,address:string,birthDate:Date,    image :File):Observable<any>{
    const formData = new FormData();
    // formData.append('', JSON.stringify(fd));
    console.log(formData)


    formData.append('firstName',  firstName);
    formData.append('lastName', lastName);
    formData.append('password', password);
    formData.append('email', email);
    formData.append('gender', gender);
    formData.append('department', department);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('birthDate', birthDate.toString());

    if(image){
  formData.append('image', image, image.name);

}
    console.log(formData)

    return this.http.post('/api/register',formData);
  }









}
