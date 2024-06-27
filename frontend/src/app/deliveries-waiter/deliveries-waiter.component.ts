import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order';

@Component({
  selector: 'app-deliveries-waiter',
  templateUrl: './deliveries-waiter.component.html',
  styleUrls: ['./deliveries-waiter.component.css']
})
export class DeliveriesWaiterComponent implements OnInit {

  constructor(private orderS:OrderService) { }

  selectedTimes:string[]=[]


  loggedUsername:string=""
  ordersPending: Order[] = []

  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.orderS.getPendingOrders(this.loggedUsername).subscribe(data=>{
        if(data){
          this.ordersPending=data
          this.selectedTimes = data.map(() => "")
        }
      })
    }
  }

  onSelect(idO: number, ind:number){
    this.orderS.acceptOrder(idO, parseInt(this.selectedTimes[ind])).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.ngOnInit()
      }
    })
  }

  reject(idO: number){
    this.orderS.reject(idO).subscribe(data=>{
      if(data){
        alert(data.msg)
        this.ngOnInit()
      }
    })
  }

}
