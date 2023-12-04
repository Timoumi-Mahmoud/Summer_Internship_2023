import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Application} from "../../../modeles/application";
import {ApplicationService} from "../../../services/applicationService/application.service";
import {Offer} from "../../../modeles/offer";


@Component({
  selector: 'app-all-my-applications',
  templateUrl: './all-my-applications.component.html',
  styleUrls: ['./all-my-applications.component.css']
})
export class AllMyApplicationsComponent implements OnInit{
  collapsed:boolean=false
  panelOpenState = false;

  offers:Offer[]=[]
  status:String[]=[]

  applicationInfo:any[]=[]


  constructor(private applicationService: ApplicationService) {
  }


  ngOnInit(): void {
    this.getAllApplicationTwo()
  }




  getAllApplication() {
    this.applicationService.seeAllMyApplication().subscribe((data: any)=>{
      for(let key of data){
        this.offers.push(key.offer)
      }
    })


    return this.offers
  }



  getAllApplicationTwo() {
    this.applicationService.seeAllMyApplication().subscribe((data: any)=>{
      this.applicationInfo=data


    })
    return this.applicationInfo
  }







}
