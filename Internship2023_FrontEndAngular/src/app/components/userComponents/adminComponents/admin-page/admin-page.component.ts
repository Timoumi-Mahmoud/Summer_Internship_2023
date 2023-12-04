import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/User/user.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{
   visible: string = "";
  ngOnInit(): void {

  }
  constructor(private  userService: UserService) {
  }



}
