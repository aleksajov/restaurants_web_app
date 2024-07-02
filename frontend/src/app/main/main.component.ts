import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { lastValueFrom } from 'rxjs';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  ngOnInit(){
    this.allGuests=[]
    this.combinedData=[]
    this.combinedDataFiltered=[]
    localStorage.clear()
    /*
    this.resService.getNumberReservations().subscribe(data=>{
      this.numberReservations=data
      this.service.getAllRestaurants().subscribe(data=>{
        this.allRestaurants=data
        this.userS.getAllUsers().subscribe(data=>{
          this.allUsers=data
        })
      })
    })
    */
    this.initialize()
  }

  async initialize():Promise<void>{
    
    try{
      this.numberReservations= await lastValueFrom(this.resService.getNumberReservations())
      const restaurants = await lastValueFrom(this.service.getAllRestaurants())
      if(restaurants){
        this.allRestaurants=restaurants
      }
      const users=await lastValueFrom(this.userS.getAllUsers())
      if(users){
        this.allUsers=users
        await this.combineData()
        this.combinedDataFiltered=this.combinedData
        this.allGuests=this.allUsers.filter(user=> user.type==="guest")
      }
    }catch (error) {
      console.error('Greška pri učitavanju', error)
    }
  }

  async combineData(): Promise<void>{
    const combinedDataPromises = this.allRestaurants.map(async restaurant => {     
     const waitersList = await lastValueFrom(this.userS.getWaiters(restaurant.id))
     let waiters: string = ""
     waitersList.forEach(element => {
      waiters+=element.firstname+" "+element.lastname+", "
     })
     waiters = waiters.slice(0, -2)
      return {
        name: restaurant.name,
        address: restaurant.address,
        type: restaurant.type,
        waiters
      }
    })
    this.combinedData=await Promise.all(combinedDataPromises)
    this.combinedDataFiltered=this.combinedData

  }

  sortData(column: string): void {
    if (this.sortColumn === column)
    {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    } 
    else
    {
      this.sortColumn = column
      this.sortDirection = 'asc'
    }

    this.combinedDataFiltered.sort((a, b) => {
      const aValue = a[column]
      const bValue = b[column]

      if (aValue < bValue)
      {
        return this.sortDirection === 'asc' ? -1 : 1
      } 
      else if (aValue > bValue) 
      {
        return this.sortDirection === 'asc' ? 1 : -1
      }
      else
      {
        return 0
      }
    })
  }

  filterRestaurants() {
    this.combinedDataFiltered = this.combinedData.filter(restaurant => {
      return (!this.searchName || restaurant.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
             (!this.searchAddress || restaurant.address.toLowerCase().includes(this.searchAddress.toLowerCase())) &&
             (!this.searchType || restaurant.type.toLowerCase().includes(this.searchType.toLowerCase()))
    })
  }

  allRestaurants: Restaurant[]=[]
  combinedDataFiltered: any[] = []
  allUsers: User[]=[]
  allGuests: User[]=[]
  combinedData: any[] = []
  sortColumn: string = ''
  sortDirection: 'asc' | 'desc' = 'asc'

  numberReservations:number[]=[]

  searchName: string = ''
  searchAddress: string = ''
  searchType: string = ''

  constructor(private service: RestaurantService, private userS: UserService, private resService:ReservationsService){}

}
