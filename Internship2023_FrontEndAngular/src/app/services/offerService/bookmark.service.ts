import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Offer} from "../../modeles/offer";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  constructor(private http: HttpClient) {
  }



  getAllBookmarkedOffer():Observable<Offer[]>{
    console.log(localStorage.getItem("id"))
    return  this.http.get<Offer[]>('/api/bookmarkedList/'+localStorage.getItem('id')) }

  UnbookmarkAnOffer(idOffer:string){
    var idUser=localStorage.getItem('id')
    return this.http.put('/api/unbookmarkOffer/'+idOffer+'/'+idUser, undefined)}
}
