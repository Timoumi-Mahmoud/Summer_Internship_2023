import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../modeles/user";


@Injectable({
  providedIn: 'root'
})

export class UserCrudService {
  constructor(private http: HttpClient) {
  }

  getListOfUser(): Observable<any> {
    return this.http.get(  '/api/userList');
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete( '/api/users/'+ id);
  }

  blockUser(id:number): Observable<any> {
   return this.http.put('api/users/blockUser/'+ id, undefined);
  }



  searchByDepartment(department:string): Observable<any>{
    return  this.http.get('/api/user/department?department='+department)
  }


  getUserByID():Observable<User[]>{
    var id=localStorage.getItem('id')
    return this.http.get<User[]>('/api/users/'+id);
  }


  updateUser(form:any){
    var id=localStorage.getItem('id')
    return this.http.put('/api/users/'+id, form);
  }


}
