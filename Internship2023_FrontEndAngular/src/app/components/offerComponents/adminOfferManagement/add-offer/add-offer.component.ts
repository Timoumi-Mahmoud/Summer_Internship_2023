import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../../modeles/utlis/my-error-state-matcher";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {SelectMaterial} from "../../../../modeles/selectMaterial";
import {OfferService} from "../../../../services/offerService/offer.service";
import Swal from "sweetalert2";
import {Offer} from "../../../../modeles/offer";

export interface generique {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css'],

})export class AddOfferComponent  implements  OnInit{
  myControl: FormControl = new FormControl();
  previewImage!:any

  constructor(private offerService:OfferService) {
  }
// @ts-ignore
  offer:Offer;

  spinnerActive:boolean=false;






  ngOnInit():void {
    // @ts-ignore
    //  this.offer=new Offer();

  }

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  tileFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  todayDate:Date = new Date() ;



  panelOpenState: boolean = false;

  matcher = new MyErrorStateMatcher();

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


  department: generique[] = [
    {value: 'TIC', viewValue: 'TIC'},
    {value: 'EM', viewValue: 'EM'},
  ];


  ClassList: string[] = ['Arctic', 'SE', 'TWIN', 'DS', 'INFINI', 'All'];

  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      this.previewImage = event.target.files[0];
    }
  }


  saveOffer(Form:any){
    this.spinnerActive=true;
    const image = this.previewImage;
  setTimeout(()=>{
    this.offerService.addNewOffer(Form.value.title, Form.value.universityName,Form.value.country, Form.value.completeAddress,Form.value.mailAddress  ,
      Form.value.universityOfficialWebsite  ,Form.value.description  , Form.value.deadlineDate, Form.value.targetClasses  ,Form.value.targetDepartment  ,Form.value.numberOfplaces  ,Form.value.score  , Form.value.conditions, image).subscribe(

      res=>{
        this.spinnerActive=false;
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Mobility offer  successfully saved',
          showConfirmButton: false,
          timer: 3000
        })

        setTimeout(() => {
          window.location.reload()
          // And any other code that should run only after 5s
        }, 5000);

      },
      err=>{
        this.spinnerActive=false;


        Swal.fire({
          icon: 'error',
          title: 'Sorry...',
          text: 'Something went wrong! try again',
        })
      }
    )

  },2000)


  }



  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}
