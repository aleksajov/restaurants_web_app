import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  getTablesForRestaurant(restaurantId: number) {
    let data = {
      restaurantId: restaurantId
    }
    return this.http.post<Table[]>('http://localhost:4000/restaurants/getTablesForRestaurant', data)
  }

  constructor(private http:HttpClient) {}


  getAllRestaurants(){
    return this.http.get<Restaurant[]>('http://localhost:4000/restaurants/getAllRestaurants')
  }
}
