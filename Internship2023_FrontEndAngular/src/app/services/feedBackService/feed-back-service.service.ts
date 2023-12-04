import { Injectable } from '@angular/core';
import {of} from 'rxjs'
import {HttpClient} from "@angular/common/http";
import {Claim} from "../../modeles/claim";
import {FeedbackViewModel} from "../../components/feedback/feedback/feedback.component";
@Injectable({
  providedIn: 'root'
})
export class FeedBackServiceService {

  constructor(private http:HttpClient) { }


  getTheMailOfConnectedUser(){
    let decodedObject=localStorage.getItem('decoded');
    // @ts-ignore
    var mailAddress=JSON.parse(decodedObject)
    var realAddress=mailAddress.email
    return realAddress
  }



  sendClaimMail(claim:FeedbackViewModel){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(claim);
    return this.http.post('/api/sendClaim', body, {'headers':headers})

  }


}
