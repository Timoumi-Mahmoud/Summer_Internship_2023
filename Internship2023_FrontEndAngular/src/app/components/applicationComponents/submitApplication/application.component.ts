import {Component, OnInit} from '@angular/core';
import {ApplicationService} from "../../../services/applicationService/application.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Application} from "../../../modeles/application";
import {User} from "../../../modeles/user";
import {ActivatedRoute, Params, Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit{
  panelOpenState = false;
  previewPDF: any;
  applicationResult:Application[]=[]
  offerID?:string
  GradeBac1?:number
  Grade1ere?:number
  Grade2eme?:number
  Grade3eme?:number

  spinnerActive:boolean=false;


  identiferFromControle = new FormControl('', [
    Validators.required,
  ]);

  englishLevelFromControle = new FormControl('', [
    Validators.required,
  ]);
  classFromControle = new FormControl('', [
    Validators.required,
  ]);
  applicationForm=this.fb.group({
    identifier:['',Validators.required] ,
    englishLevel:['',Validators.required] ,
    file:['',Validators.required] ,
    currentClass:['',Validators.required] ,




  })
  ngOnInit(): void {


    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.offerID=params['id']
      }
    );
  }


  constructor(private applicationService:ApplicationService ,private fb: FormBuilder,  private activatedRoute: ActivatedRoute , private  router: Router) {
  }

  color="primary"

  fileName = '';

  onFileSelected(event:any) {
    this.previewPDF= event.target.files[0];

    const file:File = event.target.files[0];
    if (file) {
// this.previewPDF=file


      this.fileName = file.name;

      const formData = new FormData();

      formData.append("file", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }

  onSubmit(){
    console.log(this.applicationForm.value)
  }





  getAdditonalData(){


    let identifier=this.applicationForm.value.identifier+''

    this.applicationService.getDataFromSecondDB(identifier).subscribe(  (data: Application[]) => {this.applicationResult = data
        localStorage.setItem("identifier", JSON.stringify(this.applicationResult[0].identifier) )

        this.GradeBac1=this.applicationResult[0].GradeBac
        this.Grade1ere=this.applicationResult[0].GradeFirstYear
        this.Grade2eme=this.applicationResult[0].GradeSecondYear
        this.Grade3eme=this.applicationResult[0].GradeThirdYear




      },
      err=>{
        Swal.fire({
          title: '<strong>Your <u>identifier is wrong </u></strong>',
          icon: 'info',
          html:
            'we cant find <strong>' + identifier+ '</strong> <b>In our Database</b>, ' +
            'please reenter you identifier',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })      },



    )


  }





  sendApplication(){


    if(this.applicationResult[0]===undefined){
      Swal.fire({
        icon: 'error',
        text: 'please fill all fields above !',
      })
    }
    const PDf=this.previewPDF;

    Swal.fire({
      title: 'Do you want to send this application ?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Apply',
      denyButtonText: `Don't send`,
    }).then((result) => {""
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.spinnerActive=true

        this.applicationService.send1applicationFile(PDf, this.applicationResult[0].GradeBac, this.applicationResult[0].GradeFirstYear, this.applicationResult[0].GradeSecondYear, this.applicationResult[0].GradeThirdYear,
          this.applicationForm.value.englishLevel+'', this.applicationForm.value.currentClass+'', this.offerID+'').subscribe(
          res=>{
            Swal.fire('the application was sent successfully!', '', 'success')

            setTimeout(() => {

              this.spinnerActive=false
              this.router.navigate(['/student/myApplication'])
            }, 3000);
          },
          err=>{
            alert('somthing went wrong ')
          }
        )
      } else if (result.isDenied) {
        Swal.fire('application will be not send', '', 'info')
      }
    })





  }




}


