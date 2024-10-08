import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent implements OnInit{
  loggedUsername:string=""
  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
    }
  }

  constructor(private router:Router) { }
  logout(){
    localStorage.removeItem("logged")
    this.router.navigate([""])
  }
}
