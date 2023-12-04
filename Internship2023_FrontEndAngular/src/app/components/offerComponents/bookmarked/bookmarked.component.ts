import {Component, OnInit} from '@angular/core';
import {BookmarkService} from "../../../services/offerService/bookmark.service";
import {Offer} from "../../../modeles/offer";
import {coerceStringArray} from "@angular/cdk/coercion";
import Swal from "sweetalert2";
import {pluck} from "rxjs";

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.css']
})
export class BookmarkedComponent implements OnInit {
  ngOnInit(): void {
    this.getListOfBookmarkedOffers()

  }

  constructor(private bookmarkService: BookmarkService) {
  }

  temp: any[] = []
  offers: Offer[] = []

  getListOfBookmarkedOffers() {
    this.bookmarkService.getAllBookmarkedOffer().subscribe((data: any)=>{
      this.temp=data
      this.offers=this.patch(this.temp)
    })

  }


  patch(arr:any):Offer[]{
    var result:any
    this.temp.forEach(function (item) {
      result= item.bookmarked
    });
    return result

  }



  UnbookmarkAnOffer(idOffer: string) {
        this.bookmarkService.UnbookmarkAnOffer(idOffer)
          .subscribe(
          res => {

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Offer removed from bookmarked list successfully',
              showConfirmButton: false,
              timer: 2500
            })
          },
          err => {
            Swal.fire({
              icon: 'error',
              title: 'Sorry...',
              text: 'Something went wrong! please try later',
            })
          })
    setTimeout(() => {
        window.location.reload()
      // And any other code that should run only after 5s
    }, 3000);


  }


}
