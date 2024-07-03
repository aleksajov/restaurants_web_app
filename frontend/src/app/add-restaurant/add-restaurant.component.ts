import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { read } from '@popperjs/core';
import { ReadedDataModel } from '../models/readedData';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit{
  ngOnInit(): void {
    let ls=localStorage.getItem("logged")
    console.log(ls);
    if(ls){
      this.service.getUser(JSON.parse(ls)).subscribe(korisnik=>{
        if(korisnik){
          if(korisnik.type!=="admin")
          {
            alert("Admin nije ulogovan")
            this.router.navigate(["loginAdmin"])
          }
        }
      })
    }else{
      alert("Admin nije ulogovan")
      this.router.navigate(["loginAdmin"])
    }
  }
  name:string="Aleksin restoran"
  type:string="aleksin"
  address:string="Alekse 12"
  short_desc:string="dobar restoran"
  contact:string="655033998"
  workingTime:string[]=new Array(7).fill("")
  jsonFile:File | null=null
  readedData: ReadedDataModel=new ReadedDataModel()

  constructor(private service:UserService, private router:Router, private restaurantService:RestaurantService){}

  handleFileInput(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.type === 'application/json') 
      {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          try{
            const parsed=JSON.parse(e.target.result)
            console.log(parsed)
            this.readedData=parsed
          }catch(error){
            alert("Greška pri učitavanju json fajla")
            console.log(error)
          }
        }

        reader.readAsText(file);
      }
      else 
      {
        this.jsonFile=null
        alert("Fajl mora biti u json formatu")
        
      }
    }

   
  }

  addRestaurant(){
    if(this.name=="" || this.type=="" || this.address=="" || this.short_desc=="" || this.contact==""){
      alert("Popunite sva polja")
      return
    }
    let time=false
    this.workingTime.forEach(element => {
      if(element==""){
        time=true
      }
    });
    if(time) {
      alert("Popunite radno vreme za svaki dan")
      return
    }
    if(!this.readedData){
      alert("Učitajte json")
      return
    }
    let kitchens=this.readedData.kitchens
    let tables=this.readedData.tables
    let toilets=this.readedData.toilets
    if(kitchens.length<=0){
      alert("Ne postoji ni jedna kuhinja")
      return
    }
    if(tables.length<3){
      alert("Mora postojati minumum tri stola")
      return
    }
    if(toilets.length<=0){
      alert("Ne postoji ni jedan toalet")
      return
    }
    let workingTimes:string[]=[]
    for (let i = 0; i < 7; i++) {
      workingTimes.push(this.workingTime[i])
    }
    let data={
        name: this.name,
        address: this.address,
        type: this.type,
        phone: this.contact,
        workingTime:workingTimes,
        tables: tables,
        kitchens:kitchens,
        toilets:toilets,
        short_desc:this.short_desc
    }
    this.restaurantService.addRestaurant(data).subscribe(data=>{
      if(data){
        if(data.msg=="Restoran uspešno dodat"){
          alert(data.msg)
          this.router.navigate(["admin"])
        }else{
          alert(data.msg)
        }
      }
    })
  }
}
