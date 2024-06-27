import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit{

  loggedUsername:string=""
  myOrders: Order[] = []
  pendingOrders: Order[] = []
  acceptedOrders: Order[] = []
  archivedOrders: Order[] = []
  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.orderS.getMyOrders(this.loggedUsername).subscribe(data=>{
        if(data){
          this.myOrders=data
          for (let i = 0; i < this.myOrders.length; i++) {
            const element = this.myOrders[i];
            if(element.deliveryTime==""){
              this.pendingOrders.push(element)
            }
            else if(new Date(parseInt(element.deliveryTime)).getTime()>new Date().getTime()){
              this.acceptedOrders.push(element)
            }
            else{
              this.archivedOrders.push(element)
            }
          }
          this.archivedOrders.sort((a,b)=>{return new Date(parseInt(b.deliveryTime)).getTime()-new Date(parseInt(a.deliveryTime)).getTime()})
        }
        
      })
    }
  }

  timeConversion(time: string){
    let date=new Date(parseInt(time))
    return date.toLocaleString()
  }

  constructor(private orderS:OrderService) { }  

}
