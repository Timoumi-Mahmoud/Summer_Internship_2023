import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../modeles/user";
import {UserCrudService} from "../../../../services/User/user-crud.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Offer} from "../../../../modeles/offer";
import {OfferService} from "../../../../services/offerService/offer.service";
import Swal from "sweetalert2";
import {MatSort} from "@angular/material/sort";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-offer-management',
  templateUrl: './offer-management.component.html',
  styleUrls: ['./offer-management.component.css']
})
export class OfferManagementComponent implements OnInit{

  offers: Offer[] = [];
  singleOffer:Offer[]=[];
  nbHits: number=0;
  selectedRow:any;
  constructor(private offerService:OfferService, private  route:Router) {
  }
  dataSource = new MatTableDataSource(this.getOfferList());
  dataSourceArray2 =  new MatTableDataSource();
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }


  ngOnInit(): void {
    this.offers=this.getOfferList()
  }

  @ViewChild(MatPaginator, {static: true}) paginator: any // For pagination
  @ViewChild(MatSort, {static: false}) sort: any; // For Sort

  displayedColumns : string[]=['title', 'universityName',
                              'completeAddress','mailAddress', 'deadline','score', 'nbrOfPlaces',
                              'targetDepartment', 'targetClasses' ,  'numberOfApplication',  'action']


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort;
  }


  getOfferList():Offer[]{
    this.offerService.getListOfOffers().subscribe((data: any)=>{
      this.offers = data.offers;
      this.nbHits=data.nbHits;
      this.paginator=this.offers
      this.dataSource.data = this.offers;
    })
    return this.offers

  }


  onRowClicked(row:any){
    this.selectedRow=row._id
  }


  deleteOffer(id:string){

    Swal.fire({
      title: 'Are you sure?',
      text: "Detele    " +
        " You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.offerService.deleteOffer(id).subscribe(
          res=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'deleted with success',
              showConfirmButton: false,
              timer: 1000
            })
            setTimeout(() => {
              window.location.reload()
            }, 1700);
            },
          err=>{
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: 'Something went wrong! please try later',
            })

          })

      }
    })
  }


  // seeOfferDetails(id:string){
  //   this.offerService.seeDetails(id).subscribe(
  //      res=>{
  //        this.singleOffer=res
  //      }
  //     ,err=>{})
  // }






}
