import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { AdminComponent } from './admin/admin.component';
import { WaiterComponent } from './waiter/waiter.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"guest", component:GuestComponent, children:[
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    { path: 'profile', component: ProfileComponent },
    {path:"restaurants", component:RestaurantsComponent},
    {path:"reservations", component:ReservationsComponent},
    {path:"deliveries", component:DeliveriesComponent},
  ]},
  {path:"admin", component:AdminComponent},
  {path:"waiter", component:WaiterComponent},
  {path:"loginAdmin", component:LoginAdminComponent},
  {path:"register", component:RegisterComponent},
  {path:"", component:MainComponent},
  {path:"changePass", component:ChangePasswordComponent},
  {path:"forgotten", component:ForgottenComponent},
  {path:"restaurantInfo", component:RestaurantInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
