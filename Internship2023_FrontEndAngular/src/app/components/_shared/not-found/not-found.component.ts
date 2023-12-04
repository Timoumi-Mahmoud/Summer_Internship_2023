import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {AuthService} from "../../../services/User/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements  AfterViewInit {
@ViewChild('thirdDigit') thirdDigit!: ElementRef;
@ViewChild('secondDigit') secondDigit!: ElementRef;
@ViewChild('firstDigit') firstDigit!: ElementRef;

  ngAfterViewInit(): void {
    function randomNum() {
    "use strict";
    return Math.floor(Math.random() * 9) + 1;
  }

  let loop1: any, loop2:any, loop3:any, time = 30, i = 0, number;
  loop3 = setInterval(() => {
    "use strict";
    if (i > 40) {
      clearInterval(loop3);
      this.thirdDigit.nativeElement.textContent = 4;
    } else {
      this.thirdDigit.nativeElement.textContent = randomNum();
      i++;
    }
  }, time);
  loop2 = setInterval(() => {
    "use strict";
    if (i > 80) {
      clearInterval(loop2);
      this.secondDigit.nativeElement.textContent = 0;
    } else {
      this.secondDigit.nativeElement.textContent = randomNum();
      i++;
    }
  }, time);
  loop1 = setInterval(() => {
    "use strict";
    if (i > 100) {
      clearInterval(loop1);
      this.firstDigit.nativeElement.textContent = 4;
    } else {
      this.firstDigit.nativeElement.textContent = randomNum();
      i++;
    }
  }, time);
}

  constructor(private  authService: AuthService, private route:Router) {

  }

  doRedirect(){
    if(this.authService.isLoggedIn() ===false){
      this.route.navigate(['/login'])
    }else{
      const roles= this.authService.getRoles();

      if(roles.includes( 'ADMIN')){
        this.route.navigate(['/adminPage']);
      }else{
        this.route.navigate(['/userPage']);
      }
    }

  }

}
