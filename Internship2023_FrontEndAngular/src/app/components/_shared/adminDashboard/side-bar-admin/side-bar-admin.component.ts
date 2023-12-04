import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SideBarAdminComponent implements OnInit{


  ngOnInit(): void {
  }
  constructor(private  router:Router) {
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  panelOpenState = false;

}
