import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/User/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit{
  ngOnInit(): void {
    this.RedirectBasedOnLoginOrNotAndRole()

  }
constructor(private authService: AuthService, private router:Router) {
}

  RedirectBasedOnLoginOrNotAndRole(){
    if(this.authService.isLoggedIn()===true){
      const role=  this.authService.getRoles();
      if(role.includes('USER')){
        this.router.navigate(['/userPage']);
      }else {
        this.router.navigate(['/adminPage']);

      }
    }
    else{
      this.router.navigate(['/login'])
    }

  }

  // isUserLogedIn(){
  //   if(this.authService.isLoggedIn()){
  //     return true
  //
  //   }else {
  //     console.log('\n false \n no')
  //     return false
  //   }
  // }


}
