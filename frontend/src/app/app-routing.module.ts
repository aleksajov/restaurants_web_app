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
import { ReservationsWaiterComponent } from './reservations-waiter/reservations-waiter.component';
import { DeliveriesWaiterComponent } from './deliveries-waiter/deliveries-waiter.component';
import { StatsComponent } from './stats/stats.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddWaiterComponent } from './add-waiter/add-waiter.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"guest", component:GuestComponent, children:[
    {path: "", redirectTo: "profile", pathMatch: "full"},
    {path: "profile", component: ProfileComponent },
    {path:"restaurants", component:RestaurantsComponent},
    {path:"reservations", component:ReservationsComponent},
    {path:"deliveries", component:DeliveriesComponent},
  ]},
  {path:"admin", component:AdminComponent},
  {path:"waiter", component:WaiterComponent, children:[
    {path: "", redirectTo: "profile", pathMatch: "full"},
    {path: "profile", component: ProfileComponent },
    {path:"reservations", component:ReservationsWaiterComponent},
    {path:"deliveries", component:DeliveriesWaiterComponent},
    {path:"stats", component:StatsComponent}
  ]},
  {path:"loginAdmin", component:LoginAdminComponent},
  {path:"register", component:RegisterComponent},
  {path:"", component:MainComponent},
  {path:"changePass", component:ChangePasswordComponent},
  {path:"forgotten", component:ForgottenComponent},
  {path:"restaurantInfo", component:RestaurantInfoComponent},
  {path:"update", component:UpdateUserComponent},
  {path:"addWaiter", component:AddWaiterComponent},
  {path:"addRestaurant", component:AddRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
