import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../models/reservation';
import { Table } from '../models/table';
import { RestaurantService } from '../services/restaurant.service';
import { Form, NgForm } from '@angular/forms';
import { KitchenToilet } from '../models/kitchentoilet';
import { Colors } from 'chart.js';

@Component({
  selector: 'app-reservations-waiter',
  templateUrl: './reservations-waiter.component.html',
  styleUrls: ['./reservations-waiter.component.css']
})
export class ReservationsWaiterComponent implements OnInit{
  
  loggedUsername:string=""
  logged:User=new User()
  unprocessedReservations: Reservation[] = []
  myReservations: Reservation[] = []


  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.uService.getUser(this.loggedUsername).subscribe(data=>{
        if(data){
          this.logged=data
          this.resService.getUnproccesedReservations(this.logged.idR).subscribe(data=>{
            if(data){
              let toFilter=data
              toFilter.filter(r=>{
                if(new Date(r.dateTime).getTime() < new Date().getTime()){
                  this.resService.declineReservation(r, "Isteklo vreme za rezervaciju").subscribe(data=>{
                  })
                  return false
                }
                else{
                  return true
                }
             })
             toFilter.sort((a, b) => {
              return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
            })
             this.unprocessedReservations=toFilter
            }
            this.restaurantService.getKitchensForRestaurant(this.logged.idR).subscribe(data2=>{
              this.allKitchens=data2
              this.restaurantService.getToiletsForRestaurant(this.logged.idR).subscribe(data3=>{
                this.allToilets=data3
                this.restaurantService.getTablesForRestaurant(this.logged.idR).subscribe(data4=>{
                  this.allTables=data4
                  this.drawCanvas()
                })
              })
            })
          })
        }
      })
      this.resService.getMyReservations(this.loggedUsername).subscribe(data=>{
        if(data){
         this.myReservations=data
        }
      })
    }
  }

  reinitialize(){
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.uService.getUser(this.loggedUsername).subscribe(data=>{
        if(data){
          this.logged=data
          this.resService.getUnproccesedReservations(this.logged.idR).subscribe(data=>{
            if(data){
              let toFilter=data
              toFilter.filter(r=>{
                if(new Date(r.dateTime).getTime() < new Date().getTime()){
                  this.resService.declineReservation(r, "Isteklo vreme za rezervaciju").subscribe(data=>{
                  })
                  return false
                }
                else{
                  return true
                }
             })
             toFilter.sort((a, b) => {
              return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
            })
             this.unprocessedReservations=toFilter
            }
            
          })
        }
      })
      this.resService.getMyReservations(this.loggedUsername).subscribe(data=>{
        if(data){
         this.myReservations=data
        }
      })
    }
  }

  checkHalfHour(dateTime:string){
    return new Date().getTime()>new Date(dateTime).getTime()+30*60*1000
  }


  selectTable:boolean=false
  allTables:Table[]=[]
  selectedTableId:number=-1
  acceptableTables:Table[]=[]
  reservationToApprove:Reservation=new Reservation()
  allKitchens:KitchenToilet[]=[]
  allToilets:KitchenToilet[]=[]

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
  drawCanvas() {
    
  const canvas = document.getElementById('canvas') as HTMLCanvasElement; 
  if (!canvas.getContext) {
    return;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);


  const drawTable = (element: Table, color: string) => {
    ctx.beginPath();
    ctx.arc(element.xCoord, element.yCoord, element.radius, 0, Math.PI * 2);
    
   ctx.fillText(element.numberSeats.toString(), element.xCoord, element.yCoord)
   ctx.stroke()
  };

  const drawToilet = (element: KitchenToilet, color: string) => { 
    ctx.beginPath();
    ctx.rect(element.xCoord, element.yCoord, element.width, element.height);
    
    ctx.fillText("Toalet",element.xCoord, element.yCoord)
    ctx.stroke()
  };
  const drawKitchen = (element: KitchenToilet, color: string) => { 
    ctx.beginPath();
    ctx.rect(element.xCoord, element.yCoord, element.width, element.height);
    ctx.fillText("Kuhinja",element.xCoord, element.yCoord)
    ctx.stroke()
  };

  this.allTables.forEach(table => drawTable(table, 'blue'));
  this.allKitchens.forEach(kitchen => drawKitchen(kitchen, 'red'));
  this.allToilets.forEach(toilet => drawToilet(toilet, 'green'));
}

  //one za koje se korisnik pojavio u restoranu ostaju u bazi,
  //dok one za koje je konobar potvrdio da nisu dosli se brisu
  didntCame(r:Reservation){
    this.resService.didntCame(r).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.ngOnInit()
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


        //bojenje stola u crveno
        this.drawRed(this.selectedTableId)

        this.selectTable=false
        this.selectedTableId=-1
        this.acceptableTables=[]
        this.reservationToApprove=new Reservation()

        this.reinitialize()
      }
    })

  }
  drawRed(selectedTableId: number) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement; 
    if (!canvas.getContext) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    let element=this.acceptableTables.find(table=>table.idT==selectedTableId)
    if(element){
      ctx.arc(element.xCoord, element.yCoord, element.radius, 0, Math.PI * 2);
      ctx.fillStyle = "red"
      ctx.fill()
    }


  }




  constructor(private uService:UserService, private resService:ReservationsService, private restaurantService:RestaurantService){}
}
