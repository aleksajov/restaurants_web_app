import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit{

  loggedUsername:string=""
  pendingReservations: Reservation [] = []
  acceptedReservations: Reservation [] = []
  expiredReservations: Reservation [] = []
  activeReservations: Reservation [] = []

  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.expiredReservations=[]
      this.activeReservations= []
      this.resService.getPendingReservations(this.loggedUsername).subscribe(reservations=>{
        if(reservations){
          this.pendingReservations=reservations
        }
      })
      this.resService.getAcceptedForUser(this.loggedUsername).subscribe(reservations=>{
        if(reservations){
          this.acceptedReservations=reservations
          const currDate = new Date()
          for (let i = 0; i< this.acceptedReservations.length; i++) {
          const element = this.acceptedReservations[i];
           if (new Date(element.dateTime) < currDate){
             this.expiredReservations.push(element)
           }
           else{
             this.activeReservations.push(element)
           }
          }
          this.expiredReservations.sort((a,b)=>{return new Date(a.dateTime).getTime()-new Date(b.dateTime).getTime()})
        }
      })
    }
  }

  checkTime(reservation: Reservation): boolean {
    const currDateTime= new Date()
    const resDateTime= new Date(reservation.dateTime)
    if(currDateTime.getTime()+45*60*1000<resDateTime.getTime()){
      return true
    }
    return false
  }

  cancel(reservation: Reservation): void {
    this.resService.cancel(reservation).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.ngOnInit()
      }
    })
  }

  constructor(private resService:ReservationsService){}

}
