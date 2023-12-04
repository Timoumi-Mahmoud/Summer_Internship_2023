import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserCrudService} from "../../../../services/User/user-crud.service";
import {User} from "../../../../modeles/user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import Swal from "sweetalert2";
import {FormControl, NgForm} from "@angular/forms";
export interface dep {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.css']
})
export class UserCrudComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  nbHits: number=0;
  selectedRow:any;
  selectedRowFirstName:any;
  selectedRowLastName:any;
  NameOFDep:string='';
  searchButtonIsClicked: boolean=false
  departments: dep[] = [
    {value: 'TIC', viewValue: 'TIC'},
    {value: 'EM', viewValue: 'EM'},
  ];
  classOption = ['ARCTIC', 'SE', 'SIM', 'GAMIX', 'TWIN', 'DS'];
  constructor(private userCrudService:UserCrudService) {
  }
  // @ts-ignore
  dataSource = new MatTableDataSource(this.getUserList())  ;

  ngOnInit(): void {
    this.users=this.getUserList()
  }

  @ViewChild(MatPaginator, {static: true}) paginator: any // For pagination
  @ViewChild(MatSort) sort = new MatSort();

  displayedColumns : string[]=[ 'profile_img','fullName', 'email','birthDate' , 'address', 'phoneNumber',
    'department']
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    setTimeout(() => this.dataSource.sort = this.sort, 2000);
  }


  getUserList():User[]{
    this.userCrudService.getListOfUser().subscribe((data: any)=>{
      this.users = data.users;
      this.nbHits=data.nbHits;
      this.paginator=this.users
      this.dataSource.data = this.users;

    })
    return this.users

  }


  onRowClicked(row:any){
    this.selectedRow=row._id
    this.selectedRowFirstName=row.firstName
    this.selectedRowLastName=row.lastName
  }


deleteUser(){

  Swal.fire({
    title: 'Are you sure?',
    text: "Detele    " +this.selectedRowFirstName +' '+this.selectedRowLastName+
      " You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      this.userCrudService.deleteUser(this.selectedRow).subscribe(
        res=>{
          Swal.fire(
            'Deleted!',
            'user has been deleted.',
            'success'
          )
          window.location.reload();      },
        err=>{
          alert('problem  ')

        })


    }
   // window.location.reload();
  })



}

blockUser(){
    this.userCrudService.blockUser(this.selectedRow).subscribe(
      res=>{
        alert('user Blocked ')
        window.location.reload();

      },
        err=>{
          alert('problem  ')

        }
    )
}

SearchByDepartment(forum:any){
this.searchButtonIsClicked=true;
  this.NameOFDep=forum.value
    this.userCrudService.searchByDepartment(forum.value).subscribe(
      res=>{
        this.dataSource=res
      },
      err=>{
        alert('somthing went wrong')
      }
    )
}
resetSearch(){
    // @ts-ignore
  this.dataSource=this.users
  this.searchButtonIsClicked=false;

}

}
