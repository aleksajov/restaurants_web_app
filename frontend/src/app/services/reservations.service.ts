import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  getAvgGrade(id: number) {
    let data={
      id: id
    }
    return this.http.post<number>('http://localhost:4000/reservations/getAvgGrade', data)
  }

  constructor(private http:HttpClient) { }
}
