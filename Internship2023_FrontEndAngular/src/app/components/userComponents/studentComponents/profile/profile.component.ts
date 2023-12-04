import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/User/user.service";
import {UserCrudService} from "../../../../services/User/user-crud.service";
import {User} from "../../../../modeles/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
    userInfo:User[]=[]
     my_data: any;
    isSubmitted=false;
    editProfileButton=true;
    image?:any;
    previewImage:any
  oldProfileImage:string='';

  editProfileInfo=this.fb.group({
    firstName:['',Validators.required] ,
    lastName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    gender:['', Validators.required],
    address:['', Validators.required],
    phoneNumber:['', Validators.required],
    password:['', Validators.required],
    department:['', Validators.required],
    profile_img:['', Validators.required],
    role:['']

  })


  ngOnInit(): void {

    this.loadUserInfo()
    this.editProfileInfo.disable()




  }
Name:string='';




  constructor(private  userService:UserCrudService, private fb:FormBuilder) {
  }




  public loadUserInfo() {
    this.userService.getUserByID().subscribe((data: User[]) => {this.my_data = data
      this.editProfileInfo.get('firstName')?.setValue(this.my_data.firstName)
      this.editProfileInfo.get('lastName')?.setValue(this.my_data.lastName)
      this.editProfileInfo.get('email')?.setValue(this.my_data.email)
      this.editProfileInfo.get('address')?.setValue(this.my_data.address)
      this.editProfileInfo.get('phoneNumber')?.setValue(this.my_data.phoneNumber)
      this.editProfileInfo.get('password')?.setValue(this.my_data.password)

      this.editProfileInfo.get('role')?.setValue(this.my_data.role)
      this.editProfileInfo.get('department')?.setValue(this.my_data.department)
      this.editProfileInfo.get('profile_img')?.setValue(this.my_data.profile_img)
      this.oldProfileImage=this.my_data.profile_img
      let gender=  this.my_data.gender
      // @ts-ignore
      if(gender==='Male'){
        this.editProfileInfo.get('gender')?.setValue('Male')
      }else{
        this.editProfileInfo.get('gender')?.setValue('Female')
      }


    });
  }




  onSubmit():void{
    this.userService.updateUser(this.editProfileInfo.value).subscribe(
      res=>{
        Swal.fire(
          'Good job!',
          'You just update it your account',
          'success'
        )


        setTimeout(() => {
          window.location.reload()
        }, 3000);


      },
      res=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })      }
    )
  }

  ngOnChanges() {
    ///** WILL TRIGGER WHEN PARENT COMPONENT UPDATES '**
    this.changeEditProfileButton();
  }
  changeEditProfileButton(){
    if(this.editProfileButton===true){
      this.editProfileInfo.enable();
      this.editProfileButton=false;
    }else{
    this.editProfileInfo.disable();
      this.editProfileButton=true;
    }
  }


  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      this.previewImage = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.previewImage);
      reader.onload = () => {
        this.image = reader.result;
      };
    }

  }

}
