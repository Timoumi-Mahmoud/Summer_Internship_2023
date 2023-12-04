import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ForgetPasswordDialog, LoginComponent} from "./components/userComponents/sharedComponents/login/login.component";
import {RegisterComponent} from "./components/userComponents/sharedComponents/register/register.component";

import { AdminPageComponent } from './components/userComponents/adminComponents/admin-page/admin-page.component';
import { UserDashoardComponent } from './components/userComponents/studentComponents/user-dashoard/user-dashoard.component';
import { HeaderComponent } from './components/_shared/userDashboard/header/header.component';
import { FooterComponent } from './components/_shared/userDashboard/footer/footer.component';

import { AcitvateAccountComponent } from './components/userComponents/studentComponents/acitvate-account/acitvate-account.component';
/*****Angular Material******/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from'@angular/material/form-field'
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatDividerModule} from "@angular/material/divider";
import { SideBarAdminComponent } from './components/_shared/adminDashboard/side-bar-admin/side-bar-admin.component';
import { UserCrudComponent } from './components/userComponents/adminComponents/user-crud/user-crud.component';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatTabsModule} from "@angular/material/tabs";
import {OfferComponent, OfferComponentDialog} from './components/offerComponents/offer/offer.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddOfferComponent } from './components/offerComponents/adminOfferManagement/add-offer/add-offer.component';
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatAccordion, MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatAutocomplete, MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDatepickerModule} from "@angular/material/datepicker";

import {MatRadioModule} from "@angular/material/radio";
import { OfferManagementComponent } from './components/offerComponents/adminOfferManagement/offer-management/offer-management.component';
import { ForgetPasswordComponent } from './components/userComponents/sharedComponents/forget-password/forget-password.component';
import { ProfileComponent } from './components/userComponents/studentComponents/profile/profile.component';
import { BookmarkedComponent } from './components/offerComponents/bookmarked/bookmarked.component';
import { ApplicationComponent } from './components/applicationComponents/submitApplication/application.component';
import {MatStep, MatStepperModule} from "@angular/material/stepper";
import { AllMyApplicationsComponent } from './components/applicationComponents/all-my-applications/all-my-applications.component';
import { AdminApplicationManagmentComponent } from './components/applicationComponents/admin-application-managment/admin-application-managment.component';
import {
  DialogAppSelection,
  ManageAllApplicationOfAnOfferComponent
} from './components/applicationComponents/manage-all-application-of-an-offer/manage-all-application-of-an-offer.component';
// import { PagenotfoundComponent } from './components/_shared/pagenotfound/pagenotfound.component';
import { DefaultComponent } from './components/_shared/default/default.component';
import { NotFoundComponent } from './components/_shared/not-found/not-found.component';
import { FeedbackComponent } from './components/feedback/feedback/feedback.component';
import {MatSlider, MatSliderModule} from "@angular/material/slider";
import { FaqComponent } from './components/feedback/faq/faq.component';
import {HttpRequestInterceptor} from "./services/User/_helpers/http.interceptor";
import { ConversationComponent } from './components/feedback/conversation/conversation.component';
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    UserDashoardComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    AcitvateAccountComponent,
    SideBarAdminComponent,
    UserCrudComponent,
    OfferComponent,
    AddOfferComponent,
    OfferManagementComponent,
    ForgetPasswordComponent,
    ProfileComponent,
    BookmarkedComponent,
    ApplicationComponent,
    AllMyApplicationsComponent,
    AdminApplicationManagmentComponent,
    ManageAllApplicationOfAnOfferComponent,

    DefaultComponent,
      NotFoundComponent,
      FeedbackComponent,
      FaqComponent,
      ConversationComponent,
    //OfferComponentDialog,
  ],

  entryComponents: [OfferComponent, OfferComponentDialog,LoginComponent ,ForgetPasswordDialog, ManageAllApplicationOfAnOfferComponent,  DialogAppSelection],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatDividerModule,
    MatTableModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,

    MatNativeDateModule,
    MatRadioModule,
    MatStepperModule,
    MatSliderModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  exports: [
    SideBarAdminComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
