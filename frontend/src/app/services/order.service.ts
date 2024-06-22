import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  addOrder(username: string, id: number, cart: any[]) {
    let data={
      username: username,
      idR: id,
      items: cart
    }
    return this.http.post<Message>('http://localhost:4000/orders/addOrder', data)
  }

  constructor(private http:HttpClient) { }
}
