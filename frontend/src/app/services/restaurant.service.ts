import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http:HttpClient) {}


  getAllRestaurants(){
    return this.http.get<Restaurant[]>('http://localhost:4000/restaurants/getAllRestaurants')
  }
}
