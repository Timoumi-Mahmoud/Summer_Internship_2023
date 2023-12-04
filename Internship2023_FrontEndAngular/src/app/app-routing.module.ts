import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/userComponents/sharedComponents/login/login.component";
import {AdminPageComponent} from "./components/userComponents/adminComponents/admin-page/admin-page.component";
import {UserDashoardComponent} from "./components/userComponents/studentComponents/user-dashoard/user-dashoard.component";
import {HeaderComponent} from "./components/_shared/userDashboard/header/header.component";
import {RegisterComponent} from "./components/userComponents/sharedComponents/register/register.component";
import {AcitvateAccountComponent} from "./components/userComponents/studentComponents/acitvate-account/acitvate-account.component";
import {UserCrudComponent} from "./components/userComponents/adminComponents/user-crud/user-crud.component";
import {OfferComponent} from "./components/offerComponents/offer/offer.component";
import {AddOfferComponent} from "./components/offerComponents/adminOfferManagement/add-offer/add-offer.component";
import {
  OfferManagementComponent
} from "./components/offerComponents/adminOfferManagement/offer-management/offer-management.component";
import {
  ForgetPasswordComponent
} from "./components/userComponents/sharedComponents/forget-password/forget-password.component";
import {ProfileComponent} from "./components/userComponents/studentComponents/profile/profile.component";
import {BookmarkedComponent} from "./components/offerComponents/bookmarked/bookmarked.component";
import {ApplicationComponent} from "./components/applicationComponents/submitApplication/application.component";
import {
  AllMyApplicationsComponent
} from "./components/applicationComponents/all-my-applications/all-my-applications.component";
import {
  AdminApplicationManagmentComponent
} from "./components/applicationComponents/admin-application-managment/admin-application-managment.component";
import {
  ManageAllApplicationOfAnOfferComponent
} from "./components/applicationComponents/manage-all-application-of-an-offer/manage-all-application-of-an-offer.component";
import {DefaultComponent} from "./components/_shared/default/default.component";
import {NotFoundComponent} from "./components/_shared/not-found/not-found.component";
import {FeedbackComponent} from "./components/feedback/feedback/feedback.component";
import {ConversationComponent} from "./components/feedback/conversation/conversation.component";


const routes: Routes = [

  { path: '', component: DefaultComponent },
  { path: 'verifyAccountLink', component: AcitvateAccountComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'adminPage', component: AdminPageComponent },
  { path: 'userPage', component: UserDashoardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userCrud', component: UserCrudComponent },
  { path :'changePassword' ,component: ForgetPasswordComponent},


  {path:'public',
    children:[

    ]
  },


  { path: 'student',
    children: [
      { path: 'offerList', component: OfferComponent },
      { path: 'bookmarked', component: BookmarkedComponent },
      { path: 'application/:id', component: ApplicationComponent },
      { path: 'myApplication', component: AllMyApplicationsComponent },
      { path:'claims', component:FeedbackComponent},
      { path :'profile' ,component: ProfileComponent},

    ]},



  //{ path: 'offerList', component: OfferComponent },
  { path: 'addOffer', component: AddOfferComponent },
  { path: 'AdminOfferList', component: OfferManagementComponent },

  /******ApplicationModule*****/
  { path: 'manageApp', component: AdminApplicationManagmentComponent },
  { path: 'applicationListOfAnOffer/:id', component: ManageAllApplicationOfAnOfferComponent },

  {path:'testChat', component:ConversationComponent},

  /*****FeedBack*****/
{ path: '**',
     component: NotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
