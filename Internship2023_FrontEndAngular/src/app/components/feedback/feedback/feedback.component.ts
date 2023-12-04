import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/User/auth.service";
import {FeedBackServiceService} from "../../../services/feedBackService/feed-back-service.service";
import {Claim} from "../../../modeles/claim";
import Swal from "sweetalert2";
import {Form} from "@angular/forms";
export interface FeedbackViewModel {
  senderEmail: string;
  subject: string;
  content: string;
}
@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{

  ngOnInit(): void {
    this.feedbackService.getTheMailOfConnectedUser();
  }

  mail=this.feedbackService.getTheMailOfConnectedUser()
constructor(private feedbackService:FeedBackServiceService) {
}


sendClaim(form:FeedbackViewModel){
  form.senderEmail=this.mail
    this.feedbackService.sendClaimMail(form).subscribe(
      res=>{
        Swal.fire(
          'success!',
          'You claim have been sent !',
          'success'
        )

      },
      err=>{
        alert('error has occured')

      }
    )
}

}
