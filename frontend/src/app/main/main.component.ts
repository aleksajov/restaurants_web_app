import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  ngOnInit(): void {
    this.allGuests=[]
    this.service.getAllRestaurants().subscribe(data=>{
      if(data){
        this.allRestaurants=data
      }
      this.userS.getAllUsers().subscribe(data=>{
        if(data){
          this.allUsers=data
          this.combineData();
          this.combinedDataFiltered=this.combinedData
          for (let index = 0; index < this.allUsers.length; index++) {
            const element = this.allUsers[index];
            if(element.type=="guest"){
              this.allGuests.push(element)
            }
            
          }
        }
      })
    })
  }

  combineData(): void {
    this.combinedData = this.allRestaurants.map(restaurant => {
      const waiters = restaurant.waiters.map(username => {
        const user = this.allUsers.find(user => user.username === username && user.type === 'waiter');
        return user ? `${user.firstname} ${user.lastname}` : '';
      }).filter(name => name).join(', ');

      return {
        name: restaurant.name,
        address: restaurant.address,
        type: restaurant.type,
        waiters
      };
    });
  }

  sortData(column: string): void {
    if (this.sortColumn === column)
    {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } 
    else
    {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.combinedDataFiltered.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue)
      {
        return this.sortDirection === 'asc' ? -1 : 1;
      } 
      else if (aValue > bValue) 
      {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      else
      {
        return 0;
      }
    });
  }

  filterRestaurants() {
    this.combinedDataFiltered = this.combinedData.filter(restaurant => {
      return (!this.searchName || restaurant.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
             (!this.searchAddress || restaurant.address.toLowerCase().includes(this.searchAddress.toLowerCase())) &&
             (!this.searchType || restaurant.type.toLowerCase().includes(this.searchType.toLowerCase()));
    });
  }

  allRestaurants: Restaurant[]=[]
  combinedDataFiltered: any[] = [];
  allUsers: User[]=[]
  allGuests: User[]=[]
  combinedData: any[] = [];
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  searchName: string = '';
  searchAddress: string = '';
  searchType: string = '';

  constructor(private service: RestaurantService, private userS: UserService){}

}
