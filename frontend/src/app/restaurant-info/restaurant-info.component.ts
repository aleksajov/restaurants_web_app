import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit{

  currRestaurant:Restaurant=new Restaurant()
  mapUrl: SafeResourceUrl=""
  logged:User=new User()

  constructor(private san:DomSanitizer, private userS:UserService){} 
  ngOnInit(): void {
    this.message=""
    let ls=localStorage.getItem("showRestaurant")
    if(ls){
      this.currRestaurant=JSON.parse(ls)
      this.mapUrl = this.san.bypassSecurityTrustResourceUrl(this.currRestaurant.mapUrl);
    }
    let ls2=localStorage.getItem("logged")
    if(ls2){
      this.userS.getUser(JSON.parse(ls2)).subscribe(data=>{
        this.logged=data
        console.log(this.logged)
      })
    }
  }

  shortDesc: string=""
  numPeople: string=""
  dateTime:string=""
  message:string=""

  submit(form:NgForm){
    if(form.invalid){
      this.message="Datum, vreme i broj ljudi su obavezni"
    }
    else{
      //2024-06-04T21:05  - format izlaznog stringa iz dateTime
      
    }
  }


}
