import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationService} from "../../../services/applicationService/application.service";
import {OfferService} from "../../../services/offerService/offer.service";
import {Offer} from "../../../modeles/offer";
import {OfferComponent} from "../../offerComponents/offer/offer.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../modeles/user";
import {MatSort} from "@angular/material/sort";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import Swal from "sweetalert2";
import { saveAs } from 'file-saver';
// export interface PeriodicElement {
//   fullName: string;
//   email: number;
//   currentClass: number;
//   score: number;
//   publishedAt: Date;
//   identifier: string;
// }


@Component({
  selector: 'app-manage-all-application-of-an-offer',
  templateUrl: './manage-all-application-of-an-offer.component.html',
  styleUrls: ['./manage-all-application-of-an-offer.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ManageAllApplicationOfAnOfferComponent  implements OnInit{
  options: FormGroup;
  appInfo:any=[]
  appInfo2:any=[]
  offer   = {} as Offer ;
  panelOpenState = false;





  displayedColumns: string[] = ['fullName', 'email', 'identifier', 'currentClass', 'appliedAt', 'score','applicationFile','applicationStatus', 'action'];
  dataSource = new MatTableDataSource<any>(this.getAllApplicationOfASingleOffer());
  @ViewChild(MatSort) sort = new MatSort();
  ngAfterViewInit() {
    setTimeout(() => this.dataSource.sort = this.sort, 2000);
  }
  ngOnInit(): void {
    this.getTheIDFromTheUrl()
    console.log(this.activeRoute.snapshot.paramMap.get('id'))
    this.getAllApplicationOfASingleOffer()
    this.getOfferInfoByID()

  }

  getTheIDFromTheUrl():string|null{
    return this.activeRoute.snapshot.paramMap.get('id');
  }

  constructor(private activeRoute:ActivatedRoute, private applicationService: ApplicationService, private offerService:OfferService, fb: FormBuilder, public dialog: MatDialog ) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'All',
    });
  }


  openDialog(id:string) {
    this.dialog.open(DialogAppSelection, {
      data: {
        id: id
      }
    });
  }


  getOfferInfoByID(){
    this.offerService.seeDetails(this.getTheIDFromTheUrl()+'').subscribe((data=>{
      this.offer=data
    }))
  }

  getAllApplicationOfASingleOffer():any{
   let id=this.getTheIDFromTheUrl()+''
    this.applicationService.getAllApplicationInfo(id).subscribe((data=>{
      this.appInfo=  data
      this.dataSource.data = this.appInfo;

    }))

    return this.appInfo
  }



  getAllApplicationOfASingleOfferTWO():any{
    let id=this.getTheIDFromTheUrl()+''
    this.applicationService.getAllApplicationInfoBasedOnStatus(id, this.options.value.floatLabel).subscribe((data=>{
      this.appInfo=  data
      this.dataSource.data = this.appInfo;

    }))

    return this.appInfo
  }




  downloadFile(filename: string): void {
    this.applicationService
      .exportExcel(filename)
      .subscribe(blob => saveAs(blob, filename));
  }
  testing(){
    let id=this.getTheIDFromTheUrl()+''
    this.applicationService.getAllApplicationInfoBasedOnStatus(id, this.options.value.floatLabel).subscribe((data=>{
      this.appInfo=  data
      this.dataSource.data = this.appInfo;

    }))


  }


}
@Component({
  selector: 'dialog-app-selection',
  templateUrl: 'dialogAppSelection.html',
  standalone: true,
})
export class DialogAppSelection {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private appService:ApplicationService) {}
 appId=this.data.id
  acceptApplication(){
    this.appService.acceptApp(this.appId, 'Accepted').subscribe(res=>{
        Swal.fire(
          'Good job!',
          'This application moved to the accepted list !',
          'success'
        )
      },
      err=>{}
    )
  }
  putApplicationInWaitingList(){
    this.appService.acceptApp(this.appId, 'Reject').subscribe(
      res=>{
        Swal.fire(
          'Good job!',
          'This application moved to the waiting List !',
          'success'
        )

      },
      err=>{}
    )
  }










}
