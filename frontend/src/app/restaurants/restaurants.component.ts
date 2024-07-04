import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { ReservationsService } from '../services/reservations.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit{

  allRestaurants: Restaurant[]=[]
  allWaiters: User[]=[]
  combinedData: any[] = []

  constructor(private service:RestaurantService, private userS: UserService, private resService: ReservationsService, private router:Router){}

  ngOnInit(){
    this.initialize()
  }
  async initialize(): Promise<void> {
    try {
      const restaurants = await lastValueFrom(this.service.getAllRestaurants())
      const waiters = await lastValueFrom(this.userS.getAllWaiters())
      
      if (restaurants) {
        this.allRestaurants = restaurants
      }
      
      if (waiters) {
        this.allWaiters = waiters
      }
  
      await this.combineData()
    } catch (error) {
      console.error('Greška pri učitavanju', error)
    }
  }

  floor(n: number){
    return Array<number>(Math.floor(n))
  }

async combineData(): Promise<void> {
  const combinedDataPromises = this.allRestaurants.map(async restaurant => {
    
    const waitersList = await lastValueFrom(this.userS.getWaiters(restaurant.id))
     let waiters: string = ""
     waitersList.forEach(element => {
      waiters+=element.firstname+" "+element.lastname+", "
     })
     waiters = waiters.slice(0, -2)

    let avgGrade: number
    try {
      avgGrade = await lastValueFrom(this.resService.getAvgGrade(restaurant.id))
    } catch {
      avgGrade = -1
    }

    return {
      id: restaurant.id,
      name: restaurant.name,
      address: restaurant.address,
      type: restaurant.type,
      waiters,
      avg: avgGrade === -1 ? "Još nema ocena" : avgGrade.toString()
    }
  })

  this.combinedData = await Promise.all(combinedDataPromises)
  this.combinedDataFiltered = this.combinedData
}


show(id:number){
  localStorage.setItem("showRestaurant", JSON.stringify(this.allRestaurants.find(restaurant=>restaurant.id==id)))
  this.router.navigate(['guest/restaurantInfo'])
}
  

filterRestaurants() {
  this.combinedDataFiltered = this.combinedData.filter(restaurant => {
    return (!this.searchName || restaurant.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
            (!this.searchAddress || restaurant.address.toLowerCase().includes(this.searchAddress.toLowerCase())) &&
            (!this.searchType || restaurant.type.toLowerCase().includes(this.searchType.toLowerCase()))
    })
  }

  isNumber(avg: string){
    return !isNaN(Number(avg))
  }



  combinedDataFiltered: any[] = []

  searchName: string = ''
  searchAddress: string = ''
  searchType: string = ''

}
