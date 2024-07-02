import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit{

  constructor(private router:Router){}
  loggedUsername:string=""
  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
    }
  }
  logout(){
    localStorage.removeItem("logged")
    this.router.navigate(["login"])
  }
}
