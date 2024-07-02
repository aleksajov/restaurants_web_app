import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from '../models/reservation';
import { Chart, PieController, ArcElement, Tooltip, Legend, Title, BarController, CategoryScale, LinearScale, BarElement  } from 'chart.js';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

Chart.register(
  BarController, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend,
  PieController,
  ArcElement
)

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})

export class StatsComponent implements OnInit{

  allReservations:Reservation[]=[]
  myReservations:Reservation[]=[]
  reservationCounts: number[] = new Array(7).fill(0);
  today:Date=new Date()
  reservationsNext7:Reservation[]=[]
  logged:User=new User()
  reservInLast24Months:Reservation[]=[]

  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      let username=JSON.parse(ls)
      this.servis.getUser(username).subscribe(data=>{
        this.logged=data
        this.resService.getReservationsForWaiter(username).subscribe(data=>{
        this.myReservations=data
        this.resService.getAllReservations().subscribe(data=>{
          this.allReservations=data
          this.reservInLast24Months=this.allReservations.filter(reservation=>new Date(reservation.dateTime)>=new Date(this.today.getTime()-24*30*24*60*60*1000))
          this.barDiagram()
          this.pieDiagram()
          this.histogramDiagram()
        })
      })
      })
      
    }
    
  }
  histogramDiagram(){
    let avgResByDay:number[]=new Array(7).fill(0)
    this.reservInLast24Months.forEach(res => {
      avgResByDay[new Date(res.dateTime).getDay()]++
    });
    let labels:string[]=[]
    for (let i = 0; i < 7; i++) {
      avgResByDay[i]=avgResByDay[i]*7/(24*30)
      switch(i){
        case 0: labels.push("Nedelja"); break;
        case 1: labels.push("Ponedeljak"); break;
        case 2: labels.push("Utorak"); break;
        case 3: labels.push("Sreda"); break;
        case 4: labels.push("Četvrtak"); break;
        case 5: labels.push("Petak"); break;
        case 6: labels.push("Subota"); break;
      }
    }
    const canvas = document.getElementById('histogram') as HTMLCanvasElement
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Broj rezervacija po danima u nedelji',
          data: avgResByDay,
          backgroundColor: ("rgba(0, 0, 255, 0.2)")}]}})

  }


  barDiagram(){
    let next7=new Date(this.today.getTime() + 7 * 24 * 60 * 60 * 1000)
        this.reservationsNext7=this.myReservations.filter(reservation=>new Date(reservation.dateTime)<=next7 && new Date(reservation.dateTime)>=this.today)
        for (let i = 0; i < this.reservationCounts.length; i++) {
          let datum=new Date(this.today.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          let numberPeopleSum=0
          this.reservationsNext7.forEach(res => {
            if(res.dateTime.split('T')[0]===datum){
              numberPeopleSum+=res.number
            }
          });
          this.reservationCounts[i]=numberPeopleSum
        }
        const canvas = document.getElementById('bar') as HTMLCanvasElement
        new Chart(canvas, {
          type: 'bar',
          data: {
            labels: ['Danas', 'Sutra', 'Prekosutra', 'Za 3 dana', 'Za 4 dana', 'Za 5 dana', 'Za 6 dana'],
            datasets: [{
              label: 'Broj gostiju',
              data: this.reservationCounts,
              backgroundColor:("rgba(0, 0, 255, 0.2)")}]}})


  }

  pieDiagram(){
    let allWaiters:string[]=[]
    this.allReservations.forEach(element => {
      if(!allWaiters.includes(element.waiter) && element.restaurantId===this.logged.idR){
        allWaiters.push(element.waiter)
      }
    });
    let data:number[]=[]
    data=allWaiters.map(waiter=>{
      let sum=0
      this.allReservations.forEach(reservation=>{
        if(reservation.waiter===waiter && reservation.restaurantId===this.logged.idR){
          sum+=reservation.number
        }
      })
      return sum
    })
    const canvas = document.getElementById('pie') as HTMLCanvasElement
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: allWaiters,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 0, 0, 0.2)',
            'rgba(0, 255, 0, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(255, 255, 0, 0.2)',
            'rgba(0, 255, 255, 0.2)',
            'rgba(255, 0, 255, 0.2)'
          ]
        }]
      },
      options: { 
        responsive: true,
        radius:"50%",
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return 'broj gostiju: ' + tooltipItem.raw
              }
            }
          }
        }
      }
    })
  }

  constructor(private resService:ReservationsService, private servis:UserService){}

}
