import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/User/user.service";

@Component({
  selector: 'app-user-dashoard',
  templateUrl: './user-dashoard.component.html',
  styleUrls: ['./user-dashoard.component.css']
})
export class UserDashoardComponent implements OnInit{
  constructor(private UserSerice: UserService) {
  }

  ngOnInit(): void {
  }



  logout(){
    this.UserSerice.signout()
  }
}
