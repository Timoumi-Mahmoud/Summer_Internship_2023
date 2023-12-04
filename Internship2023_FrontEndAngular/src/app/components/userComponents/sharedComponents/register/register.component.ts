
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {RegisterServiceService} from "../../../../services/register-service.service";
import {switchAll} from "rxjs";


export interface Register {

  firstName:string;
  lastName:string;
  gender: string;
  department:string
  password: string;
  email:string;
  roles?: string[];
  phoneNumber:string;
 // birthDate :Date;
  image?:any;
  previewImage:any
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {
  constructor(private authService: RegisterServiceService, private router: Router, private activeRoute: ActivatedRoute) {
  }
  retypePassword:string='';
  error: string = '';
  department: string = '';
  gender:string= '';
  password: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  address:string='';
  birthDate = new Date();
  image!:any;
  previewImage!:any
  success: string = '';

  ngOnInit(): void {
  }

  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      this.previewImage = event.target.files[0];
    }
  }

  register(form:any){

    // @ts-ignore
    const image = this.previewImage;
    this.authService.registerNewUserThree(this.firstName, this.lastName,
                                          this.email, this.password,this.gender,
                                          this.department, this.phoneNumber , this.address,this.birthDate, image).subscribe(


      res=> {
        this.authService.SendVificationEmail(this.email).subscribe(
          res => {


            Swal.fire(
              'welcome to our platform !',
              'please check your mail inbox to verify your account  ',
              'success'
            )
            this.router.navigate(['/login'])

          },
          err => {
            alert('error while sending the activation link ')

          })
      }
,err=>{
        alert('error while creating an account')
      })
  }





}
