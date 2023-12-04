import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../services/User/auth.service";
import {NgForm} from "@angular/forms";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  constructor(private authService: AuthService, private route: Router, private http: HttpClient, private acitveRoute: ActivatedRoute) {
  }

  token?:string;
  password?:string;

  ngOnInit(): void {
    this.token =  String(this.acitveRoute.snapshot.queryParamMap.get('token'));
    var tt=String(this.acitveRoute.snapshot.queryParamMap.get('token'));
  }



  changePWDTwo(form: NgForm){
    this.authService.ChangePWD(String(this.token) , form.value.password).subscribe(
      res=> {
        Swal.fire("Congratulation  you have update it your password " )
        this.route.navigateByUrl('/login');
      },
      err=>{
        Swal.fire("Congratulation  you have update it your password  ")

        this.route.navigateByUrl('/login');

      }

    )
  }


}
