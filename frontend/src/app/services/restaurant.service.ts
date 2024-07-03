import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { Table } from '../models/table';
import { Message } from '../models/message';
import { KitchenToilet } from '../models/kitchentoilet';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  getToiletsForRestaurant(restaurantId: number) {
    let data={
      restaurant:restaurantId
    }
    return this.http.post<KitchenToilet[]>('http://localhost:4000/restaurants/getToilets', data)
  }
  getKitchensForRestaurant(restaurantId: number) {
    let data={
      restaurant:restaurantId
    }
    return this.http.post<KitchenToilet[]>('http://localhost:4000/restaurants/getKitchens', data)
  }
  addRestaurant(data: { name: string; address: string; type: string; phone: string; workingTime: string[]; tables: Table[]; kitchens: import("../models/kitchentoilet").KitchenToilet[]; toilets: import("../models/kitchentoilet").KitchenToilet[]; short_desc:string;}) {
    return this.http.post<Message>('http://localhost:4000/restaurants/addRestaurant', data)
  }
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
