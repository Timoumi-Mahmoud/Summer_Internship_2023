import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/User/user.service";
import {ActivatedRoute, Router} from "@angular/router";
export interface MenuItem {
  label: string;
  icon: string;
  href:any
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;

}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  constructor(private  userService: UserService,    private router:Router) {}

  ngOnInit(): void {
  }
  isLoggedIn: boolean = false;

  menuItems: MenuItem[] = [

    {
      label: 'Offers',
      icon: 'notes',
      href:   '/student/offerList',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    }
    ,
    {
      label: 'Bookmarks',
      icon: 'bookmark',
      href:'/student/bookmarked',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Application',
      icon: 'video_stable',
      href:'/student/myApplication',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Claim',
      icon: 'send',
      href:'/student/claims',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: 'Forum',
      icon: 'forum',
      href:'',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'log out',
      icon: 'logout',
      href:'/login',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'Profile',
      icon: 'account_circle',
      href: '/student/profile'  ,
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },



  ];


  logout(){
    localStorage.clear();
  }

  profilePage() {
    setTimeout(() => {
      this.router.navigate(['/profile']);
    });

}







}
    // this.router.navigate(['/', 'profile']);  }



