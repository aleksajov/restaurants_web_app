import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/user.service';
import { Restaurant } from '../models/restaurant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  logged:User=new User()
  loggedUsername:string=""
  guests:User[]=[]
  waiters:User[]=[]
  allRestaurants:Restaurant[]=[]
  registerRequests:User[]=[]
  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.userService.getAllUsers().subscribe(data=>{
        if(data){
          this.guests=data.filter(user=>user.type=="guest")
          this.waiters=data.filter(user=>user.type=="waiter")
        }
      })
      this.restaurantService.getAllRestaurants().subscribe(data=>{
        if(data){
          this.allRestaurants=data
        }
      })
      this.userService.getRegisterRequests().subscribe(data=>{
        if(data){
          this.registerRequests=data
        }
      })
    }
  }
  update(username: string){
    localStorage.setItem("update",JSON.stringify(username))
    this.router.navigate(["update"])
  }

  accept(username: string){
    this.userService.acceptRegister(username).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.userService.getRegisterRequests().subscribe(data=>{
          if(data){
            this.registerRequests=data
          }
        })
      }
  })
}

  decline(username: string, mail: string){
    this.userService.declineRegister(username, mail).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.userService.getRegisterRequests().subscribe(data=>{
          if(data){
            this.registerRequests=data
          }
        })
      }
    })
  }


  constructor(private restaurantService:RestaurantService, private userService:UserService, private router:Router) { }
}
