import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { WaiterComponent } from './waiter/waiter.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgottenComponent } from './forgotten/forgotten.component';
import { ProfileComponent } from './profile/profile.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DeliveriesComponent } from './deliveries/deliveries.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';
import { StatsComponent } from './stats/stats.component';
import { DeliveriesWaiterComponent } from './deliveries-waiter/deliveries-waiter.component';
import { ReservationsWaiterComponent } from './reservations-waiter/reservations-waiter.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddWaiterComponent } from './add-waiter/add-waiter.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GuestComponent,
    WaiterComponent,
    AdminComponent,
    LoginAdminComponent,
    MainComponent,
    RegisterComponent,
    ChangePasswordComponent,
    ForgottenComponent,
    ProfileComponent,
    RestaurantsComponent,
    ReservationsComponent,
    DeliveriesComponent,
    RestaurantInfoComponent,
    StatsComponent,
    DeliveriesWaiterComponent,
    ReservationsWaiterComponent,
    UpdateUserComponent,
    AddWaiterComponent,
    AddRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
