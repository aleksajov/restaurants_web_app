import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})
export class RestaurantInfoComponent implements OnInit{

  currRestaurant:Restaurant=new Restaurant()
  mapUrl: SafeResourceUrl=""
  logged:User=new User()

  constructor(private san:DomSanitizer, private userS:UserService, private resService:ReservationsService, private orderS:OrderService){} 
  ngOnInit(): void {
    this.message=""
    this.shortDesc=""
    this.numPeople=1
    this.dateTime=""
    this.howMany=[]
    this.cart=[]
    this.boolOrder=false
    let ls=localStorage.getItem("showRestaurant")
    if(ls){
      this.currRestaurant=JSON.parse(ls)
      this.mapUrl = this.san.bypassSecurityTrustResourceUrl(this.currRestaurant.mapUrl)
      this.currRestaurant.menu.forEach(() => {
        this.howMany.push(0);
      });
    }
    let ls2=localStorage.getItem("logged")
    if(ls2){
      this.userS.getUser(JSON.parse(ls2)).subscribe(data=>{
        this.logged=data
      })
    }
  }

  shortDesc: string=""
  numPeople: number=1
  dateTime:string=""
  message:string=""
  howMany: number[] = [];

  submit(form:NgForm){
    if(form.invalid){
      this.message="Datum, vreme i broj ljudi su obavezni"
      return
    }
    const currentDate = new Date();
    const selectedDate = new Date(this.dateTime);
    if (selectedDate <= currentDate){
      this.message = "Datum mora biti u budućnosti";
      return
    }
    if(this.numPeople<1){
      this.message="Broj ljudi mora biti minimalno 1"
      return
    } 
    else {
        //2024-06-04T21:05  - format izlaznog stringa iz dateTime
        this.resService.addReservationReq(this.logged.username, this.currRestaurant.id, this.dateTime, this.numPeople, this.shortDesc).subscribe(data => {
          if (data) {
            alert(data.msg)
            this.message = ""
            this.shortDesc = ""
            this.numPeople = 1
            this.dateTime = ""
          }
        })
      }
    
  }

  message2:string=""
  cart: any[]=[]

  boolOrder:boolean=false

  addToCart(){
    for(let i=0;i<this.howMany.length;i++){
      let found = this.cart.find(item => item.idF === this.currRestaurant.menu[i].idF);
      if(found){
        if(this.howMany[i] > 0){
          found.quantity = this.howMany[i];
        } else {
          this.cart = this.cart.filter(item => item.idF !== this.currRestaurant.menu[i].idF);
        }
      } else if(this.howMany[i] > 0){
        this.cart.push({idF:this.currRestaurant.menu[i].idF, quantity:this.howMany[i]});
      }
    }
    if(this.cart.length==0){
      this.message2="Morate izabrati bar jedno jelo"
      this.boolOrder = false
    }
    else{
      this.message2="Korpa ažurirana"
      this.boolOrder = true
    }
  }

  order(){
    if(this.cart.length==0){
      this.message2="Morate izabrati bar jedno jelo"
    }
    else{
      this.orderS.addOrder(this.logged.username, this.currRestaurant.id, this.cart).subscribe(data => {
        if (data) {
          alert(data.msg)
        }
        this.boolOrder=false
          this.cart = []
          this.message2=""
          this.howMany=[]
      })
    }
  }


}
