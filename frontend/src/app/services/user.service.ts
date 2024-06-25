import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  checkAnswer(username: string, answerQuest: string) {
    let data={
      username: username,
      answer: answerQuest
    }
    return this.http.post<Message>('http://localhost:4000/users/checkAnswer', data)
  }
  getAllUsers() {
    return this.http.get<User[]>('http://localhost:4000/users/getUsers')
  }
  getAllWaiters() {
    return this.http.get<User[]>('http://localhost:4000/users/getWaiters')
  }
  updateData(data: { newFirstname: string; newLastname: string; newMail: string; newPhone: string; newCard: string; newAddress: string; photo:string; username: string }) {
    return this.http.post<Message>('http://localhost:4000/users/updateData', data)
  }
  changePass(loggedUsername: string, newPass1: string) {
    let data={
      username: loggedUsername,
      password: newPass1
    }
    return this.http.post<Message>('http://localhost:4000/users/changePassword', data)
  }
  checkPassword(loggedUsername: string, password: string) {
    let data={
      username: loggedUsername,
      password: password
    }
    return this.http.post<Message>('http://localhost:4000/users/checkPassword', data)
  }
  getUser(loggedUsername: string) {
    let data={
      username: loggedUsername
    }
    return this.http.post<User>('http://localhost:4000/users/getUser', data)
  }

  register(data: any)
  {
    return this.http.post<Message>('http://localhost:4000/users/register', data)
  }


  loginAdmin(username: string, password: string) {
    const data={
      username: username,
      password: password
    }
    return this.http.post<any>("http://localhost:4000/users/loginAdmin", data)
  }
  login(username: string, password: string){
    const data={
      username: username,
      password: password
    }
    return this.http.post<any>("http://localhost:4000/users/login", data)
  }

  constructor(private http: HttpClient) { }
}
