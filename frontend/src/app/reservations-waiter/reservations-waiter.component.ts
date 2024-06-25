import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../models/reservation';
import { Table } from '../models/table';
import { RestaurantService } from '../services/restaurant.service';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-reservations-waiter',
  templateUrl: './reservations-waiter.component.html',
  styleUrls: ['./reservations-waiter.component.css']
})
export class ReservationsWaiterComponent implements OnInit{
  
  loggedUsername:string=""
  logged:User=new User()
  unprocessedReservations: Reservation[] = []
  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.uService.getUser(this.loggedUsername).subscribe(data=>{
        if(data){
          this.logged=data
          this.resService.getUnproccesedReservations(this.logged.idR).subscribe(data=>{
            if(data){
              this.unprocessedReservations=data
              this.unprocessedReservations.sort((a, b) => {
                return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
              });
              this.unprocessedReservations.filter(r=>{
                if(new Date(r.dateTime).getTime() < new Date().getTime()){
                  this.resService.declineReservation(r, "Isteklo vreme za rezervaciju").subscribe(data=>{
                  })
                  return false
                }
                else{
                  return true
                }
              })
            }
          })
        }
      })
    }
  }


  selectTable:boolean=false
  allTables:Table[]=[]
  selectedTableId:number=-1
  acceptableTables:Table[]=[]
  reservationToApprove:Reservation=new Reservation()
  accept(r:Reservation){
    this.selectTable=true
    this.reservationToApprove=r
    this.restaurantService.getTablesForRestaurant(r.restaurantId).subscribe(data=>{
      if(data){
        this.allTables=data
        this.acceptableTables = this.allTables.filter(table => {
          if (table.numberSeats >= r.number) {
            const reservationTime = new Date(r.dateTime).getTime();
            const reservationEndTime = reservationTime + (3*60*60*1000-1)
        
            const intersectingTimes = table.taken.filter(takenTime => {
            const startTime = new Date(takenTime).getTime()
            const endTime = startTime + (3*60*60*1000-1)
            const reservationDate = new Date(reservationTime).toLocaleDateString()
            const startDate = new Date(startTime).toLocaleDateString()
            if(reservationDate !== startDate){
              return false;
            }
            

            const endsBeforeTaken = reservationEndTime < startTime;
            const timeInBetween = reservationTime >= startTime && reservationTime <= endTime
            return timeInBetween || (reservationTime<startTime && !endsBeforeTaken);
            })
            return intersectingTimes.length === 0;
          }
          return false; 
        })
        if(this.acceptableTables.length==0){
          alert("Nema dostupnih stolova za rezervaciju")
          this.selectTable=false
          this.acceptableTables=[]
          this.selectedTableId=-1
          this.reservationToApprove=new Reservation()
        }
      }
    })
  }




  declineShow:boolean=false
  declinedRes:Reservation=new Reservation()
  decline(r:Reservation){
    this.declineShow=true
    this.declinedRes=r
  }

  declination:string=""
  submit(form:NgForm)
  {
    if(form.invalid){
      return
    }
    this.resService.declineReservation(this.declinedRes, this.declination).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.declineShow=false
        this.declinedRes=new Reservation()
        this.declination=""
        this.ngOnInit()
      }
    })
  }

  disabled(r:Reservation){
    return this.declineShow || new Date(r.dateTime).getTime()<new Date().getTime()
  }

  approveReservation(){
    this.resService.approveReservation(this.selectedTableId, this.reservationToApprove, this.loggedUsername).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.selectTable=false
        this.selectedTableId=-1
        this.acceptableTables=[]
        this.reservationToApprove=new Reservation()
        this.ngOnInit()
      }
    })

  }




  constructor(private uService:UserService, private resService:ReservationsService, private restaurantService:RestaurantService){}
}
