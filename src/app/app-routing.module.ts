import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from "./BackOffice/home-back/home-back.component";
import { SidebarComponent } from "./BackOffice/sidebar/sidebar.component";
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { HomeFrontComponent } from "./FrontOffice/home-front/home-front.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {AddCarpoolingComponent} from "./BackOffice/add-carpooling/add-carpooling.component";
import {AllanncollComponent} from "./BackOffice/allanncoll/allanncoll.component";
import {AddanncollComponent} from "./BackOffice/addanncoll/addanncoll.component";
import {AddBookingcollComponent} from "./BackOffice/add-bookingcoll/add-bookingcoll.component";
import {AllBookingcollComponent} from "./BackOffice/all-bookingcoll/all-bookingcoll.component";
import { FavorisComponent } from './BackOffice/favoris/favoris.component';
import { UpdateanncollComponent } from './BackOffice/addanncoll/updateanncoll.component';

const routes: Routes = [

  {
    path: "",
    component: AllTemplateFrontComponent,
    children: [
      {
        path: "home",
        component: HomeFrontComponent
      }
      ,
      {
        path: "addColl",
        component: AddanncollComponent
      },
      {
        path: "updateColl/:id",
        component: UpdateanncollComponent
      }
      ,
      {
        path: "annColl",
        component: AllanncollComponent
      }
      ,
      {
        path: "addBooColl",
        component: AddBookingcollComponent
      }
      ,
      {
        path: "booColl",
        component: AllBookingcollComponent
      },
      {
        path: "favoris",
        component:FavorisComponent
      }
    ]
  },


  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "home",
        component: HomeBackComponent
      }


    ]
  },

  {path:"add",
    component:FeedbackComponent},
  {path:"addCarpooling",
    component:AddCarpoolingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
