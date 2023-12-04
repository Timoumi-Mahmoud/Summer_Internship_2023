import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) {
  }

  getListOfOffers(): Observable<any> {
    return this.http.get(  '/api/offerList');
  }

  deleteOffer(id: string): Observable<any> {
    return this.http.delete( '/api/offer/'+ id);
  }


  seeDetails(id:string): Observable<any> {
    return this.http.get(  '/api/offer/'+id);
  }

  bookmarkAnOffer(idOffer:any, idUser:any, offer:any  ):Observable<any> {
    return this.http.post('/api/bookmark/'+`${idOffer}`+"/"+`${idUser}`, offer)
  }

  searchForAnOffer(targetClasses:string, country:string, univeristyName:string){
    return this.http.get('/api/searchOffer?targetClasses='+targetClasses+'&country='+country+'&univeristyName='+univeristyName)
  }



  addNewOffer( title:string,universityName: string, country:string, completeAddress:string,
              mailAddress:string, universityOfficialWebsite:string,description:string,deadlineDate:Date,
              targetClasses:string, targetDepartment:string, numberOfplaces:number, score:number
              , conditions:string,  image :File){
    const formData = new FormData();
    // formData.append('', JSON.stringify(fd));
    console.log(formData)


    console.log(title)
    formData.append('title',  title);
    formData.append('universityName',  universityName);
    formData.append('country', country);
    formData.append('completeAddress', completeAddress);
    formData.append('mailAddress',  mailAddress);
    formData.append('universityOfficialWebsite', universityOfficialWebsite);
    formData.append('description', description);
    formData.append('targetClasses', targetClasses);
    formData.append('deadlineDate',deadlineDate.toString()),
    formData.append('targetDepartment',  targetDepartment);
    formData.append('numberOfplaces', numberOfplaces.toString());
    formData.append('score', score.toString());
    formData.append('conditions', conditions);

console.log(image)
    console.log(typeof(image))
    if(image){
      formData.append('image', image, image.name);

    }

    console.log(formData)

    return this.http.post('/api/addOffer',formData);

  }
}


