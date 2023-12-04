import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {
  }

  getDataFromSecondDB(identifer: string): Observable<any> {
    return this.http.get('/api/additionalInfo?identifier=' + identifer);
  }


  send1applicationFile(file: File, GradeBac: number, GradeFirstYear: number, GradeSecondYear: number, GradeThirdYear: number, englishLevel: string, currentClass: string, offerId: string) {
    var userID = localStorage.getItem('id');
    var identifier = localStorage.getItem('identifier');

    var decoded = localStorage.getItem('decoded')
    // @ts-ignore
    var decodedObj = JSON.parse(decoded)
    console.log(decodedObj.email)
    var studentMail = decodedObj.email

    const formData = new FormData();
    formData.append('file', file);

    console.log(formData)

    return this.http.post('/api/submitApplication?currentClass=' + currentClass + '&englishLevel=' + englishLevel + '&studentID=' + userID + '&offerID=' + offerId + '&identifier=' + identifier + '&mailAddress=' + studentMail, formData)

  }


  seeAllMyApplication() {
    var userID = localStorage.getItem('id');
    return this.http.get('/api/getAllApplicationOfAStudent/' + userID)
  }


  getAllApplicationInfo(offerId: string) {
    return this.http.get('/api/getAllApplicationOfAnOffer?offerId=' + offerId)
  }


  getAllApplicationInfoBasedOnStatus(offerId: string, status: String) {
    return this.http.get('/api/getAllApplicationOfAnOfferBasedOnStatus?offerId=' + offerId + '&applicationStatus=' + status)
  }


  ////////////////////////
  acceptApp(appId: String, decision: string) {
    return this.http.patch('/api/finalDecisionAboutAnApplication?applicationId=' + appId + '&decision=' + decision, undefined)
  }


  //
  // exportExcel(){
  //   return this.http.get('/api/getExcel',{ responseType: 'blob'} )
  // }


  exportExcel(file: string | undefined): Observable<Blob> {
    return this.http.get('/api/getExcel', {
      responseType: 'blob'
    });

  }


}
