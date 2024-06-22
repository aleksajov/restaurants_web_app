import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  addReservationReq(username: string, id: number, dateTime: string, numPeople: number, shortDesc: string) {
    let data={
      username: username,
      id: id,
      dateTime: dateTime,
      number: numPeople,
      description: shortDesc
    }
    return this.http.post<Message>('http://localhost:4000/reservations/addRequest', data)
  }
  getAvgGrade(id: number) {
    let data={
      id: id
    }
    return this.http.post<number>('http://localhost:4000/reservations/getAvgGrade', data)
  }

  constructor(private http:HttpClient) { }
}
