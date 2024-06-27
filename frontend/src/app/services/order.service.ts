import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getMyOrders(loggedUsername: string) {
    let data={
      username: loggedUsername
    }
    return this.http.post<Order[]>('http://localhost:4000/orders/getMyOrders', data)
  }
  reject(idO: number) {
    let data={
      idO: idO
    }
    return this.http.post<Message>('http://localhost:4000/orders/reject', data)
  }
  acceptOrder(idO: number, arg1: number) {
    let data={
      idO: idO,
      time: arg1
    }
    return this.http.post<Message>('http://localhost:4000/orders/acceptOrder', data)
  }
  getPendingOrders(loggedUsername: string) {
    let data={
      waiter: loggedUsername
    }
    return this.http.post<Order[]>('http://localhost:4000/orders/getPending', data)
  }
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
