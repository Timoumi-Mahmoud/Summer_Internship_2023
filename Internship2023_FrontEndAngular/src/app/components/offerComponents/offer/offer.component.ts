import {Component, Inject, OnInit} from '@angular/core';
import {OfferService} from "../../../services/offerService/offer.service";
import {User} from "../../../modeles/user";
import {Offer} from "../../../modeles/offer";
import {Router} from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {DatePipe, NgIf} from "@angular/common";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from "../../../services/User/user.service";
import {dep} from "../../userComponents/adminComponents/user-crud/user-crud.component";
import {SelectMaterial} from "../../../modeles/selectMaterial";
import {FormControl} from "@angular/forms";
import {BookmarkService} from "../../../services/offerService/bookmark.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent  implements OnInit{

  offers: Offer[] = [];
  title1:string=''
  id1:string=''
  description1:string=''
  image1:string=''
  deadline1?:Date
  publishDate1?:Date
  score1?:number
  country1:string=''
  conditions1?:string
  universityName1?:string
  completeAddress1?:string
  targetDepartment1?:string
  targetClasses1?:string
  mailAddress1?:string
  universityOfficialWebsite1?:string
  numberOfplaces1?:number

isBookmarked=false

  searchButtonIsClicked:boolean=false
  country: SelectMaterial[] = [
    {value: 'France', viewValue: 'France'},
    {value: 'Spain', viewValue: 'Spain'},
    {value: 'United-states', viewValue: 'United states'},
    {value: 'Germany', viewValue: 'Germany'},
    {value: 'United-Kingdom', viewValue: 'United Kingdom'},
    {value: 'Switzerland', viewValue: 'Switzerland'},
    {value: 'Canada', viewValue: 'Canada'},
    {value: 'Italy', viewValue: 'Italy'},
    {value: 'Japan', viewValue: 'Japan'},
    {value: 'Ireland', viewValue: 'Ireland'},
    {value: 'belgium', viewValue: 'belgium'},

  ];
  singleOffer: Offer[]=[];
  nbHits: number=0;
  store:Offer[]=[];

  constructor(private offerService:OfferService , private route:Router, public dialog: MatDialog , private  userService:UserService, private bookmarkService:BookmarkService) {
  }
  ngOnInit(): void {
    if(this.searchButtonIsClicked==false) {

      this.offers = this.getOfferList()
    }

  }


  getOfferList():Offer[]{
    this.searchButtonIsClicked=false
    this.offerService.getListOfOffers().subscribe((data: any)=>{
      this.offers = data.offers;
      this.nbHits=data.nbHits;
    })
    this.store=this.offers
    return this.offers
  }

  seeOfferDetails(id:string){
    this.offerService.seeDetails(id).subscribe(
      res=>{
        // @ts-ignore

        this.openDialog(res)
      }
      ,err=>{
        alert('error occurred ')
      })
  }


  bookmarkAnOffer(idOffer: any){
    let id=  this.userService.getUserID()
    this.offerService.bookmarkAnOffer(idOffer, id, '' ).subscribe(
      res=>{
       let id=  this.userService.getUserID()
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Offer  bookmarked  successfully',
          showConfirmButton: false,
          timer: 2500
        })
      }
      , res=>{
        Swal.fire(
          'This offer already bookmarked',
        )

      //  alert('error occurred')
      })

  }


  reloadPage(){
    this.searchButtonIsClicked===false
    window.location.reload()
  }


  serachForAnOffe(Form:any){
    this.offerService.searchForAnOffer(Form.value.targetClasses, Form.value.country, Form.value.univeristyName).subscribe((data: any) => {
      this.offers = data.offers;
    })

    this.searchButtonIsClicked=true
    // window.location.reload()
  }



  addOfferToBookmarkedList(){

  }



  openDialog(values:Offer) {



   let title= values.title
    let id= values._id
    let description = values.description
    let image=values.offer_img
    let deadline=values.deadlineDate
    let conditions=values.conditions
    let score=values.score
    let publishDate=values.publishDate
    let universityName=values.universityName
    let country= values.country
    let completeAddress=values.completeAddress
    let mailAddress= values.mailAddress
    let  targetClasses=values.targetClasses
    let targetDepartment= values.targetDepartment
    let universityOfficialWebsite= values.universityOfficialWebsite
    let numberOfplaces=values.numberOfplaces
    let dialogRef= this.dialog.open(OfferComponentDialog, {
      data: {
        title1:title,
        id1:id,
        description1:description,
        image1:image,
        deadline1: deadline,
        conditions1:conditions,
        score1:score,
        universityName1:universityName,
        completeAddress1:completeAddress,
        publishDate1:publishDate,
        country1:country,
        targetDepartment1:targetDepartment,
        targetClasses1:targetClasses,
        mailAddress1:mailAddress,
        universityOfficialWebsite1:universityOfficialWebsite,
        numberOfplaces1:numberOfplaces
      },
    });
  }
}



@Component({
  selector: 'OfferComponentDialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatDialogModule, NgIf, DatePipe],
})
export class OfferComponentDialog {
  constructor(@Inject(MAT_DIALOG_DATA ) public data: OfferComponent, private router: Router) {}

  redirectToApplicationPage(){
    this.router.navigate(['/student/application/', this.data.id1])
  }
}
