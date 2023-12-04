import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../services/applicationService/application.service";
import {pluck} from "rxjs";

@Component({
  selector: 'app-admin-application-managment',
  templateUrl: './admin-application-managment.component.html',
  styleUrls: ['./admin-application-managment.component.css']
})
export class AdminApplicationManagmentComponent implements OnInit{

  applicationInfo:any[]=[]


  constructor(private applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    this.getAllApplicationInfo()
    //this.exemple()
  }



  getAllApplicationInfo(){
    this.applicationService.getAllApplicationInfo('64cbd2194020d62148a5af37').subscribe(
      res=>{
        const jsonValue = JSON.stringify(res);
        const valueFromJson = JSON.parse(jsonValue);
      //  const success = ((valueFromJson || {}).nbre )
        const students = ((((valueFromJson || {}).nbre || {}).students ));
        const applications = ((((valueFromJson || {}).nbre || {}).students ));
        console.log("JsonValue"+ jsonValue)
        console.log("value form Json"+ valueFromJson)
        console.log(students)

      },
      err=>{
        alert('error here')
      }
    )
  }







  //Check it later
  exemple(){
    this.applicationService.getAllApplicationInfo('64cbd2194020d62148a5af37'). pipe(pluck("students"))
      .subscribe(r => {
        console.log("hererre\n ")
        console.log(r);
      });
  }

}
