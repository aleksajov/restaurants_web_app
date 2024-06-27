import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  didntCame(r: Reservation) {
    let data={
      reservation: r
    }
    return this.http.post<Message>('http://localhost:4000/reservations/didntCame', data)
  }
  getMyReservations(loggedUsername: string) {
    let data={
      username: loggedUsername
    }
    return this.http.post<Reservation[]>('http://localhost:4000/reservations/getMyReservations', data)
  }
  cancel(reservation: Reservation) {
    let data={
      reservation: reservation
    }
    return this.http.post<Message>('http://localhost:4000/reservations/cancel', data)
  }
  getAcceptedForUser(loggedUsername: string) {
    let data={
    username: loggedUsername
    }
    return this.http.post<Reservation[]>('http://localhost:4000/reservations/getAcceptedForUser', data)
  }
  getPendingReservations(loggedUsername: string) {
    let data={
      username: loggedUsername
    }
    return this.http.post<Reservation[]>('http://localhost:4000/reservations/getPending', data)
  }
  approveReservation(selectedTableId: number, reservationToApprove: Reservation, loggedUsername: string) {
    let data={
      selectedTableId: selectedTableId,
      reservationToApprove: reservationToApprove,
      waiter:loggedUsername
    }
    return this.http.post<Message>('http://localhost:4000/reservations/approve', data)
  }
  declineReservation(declinedRes: Reservation, declination: string) {
    let data={
      declinedRes: declinedRes,
      declination: declination
    }
    return this.http.post<Message>('http://localhost:4000/reservations/decline', data)
  }
  getUnproccesedReservations(idR: number) {
    let data={
      idR: idR
    }
    return this.http.post<Reservation[]>('http://localhost:4000/reservations/getUnprocessed', data)
  }
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
