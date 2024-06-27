import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{


  loggedUsername:string=""
  logged: User=new User()

  newFirstname: string=""
  newLastname: string=""
  newMail: string=""
  newPhone: string=""
  newCard: string=""
  newAddress: string=""
  photo: File | null = null;

  message2: string=""
  message: string=""


  constructor(private service:UserService, private router:Router){}

  ngOnInit(): void {
    this.newFirstname=""
    this.newLastname=""
    this.newMail=""
    this.newPhone=""
    this.newCard=""
    this.newAddress=""
    this.photo= null;

    this.message2=""
    this.message=""

    let ls=localStorage.getItem("update")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.service.getUser(this.loggedUsername).subscribe(user=>{
        this.logged=user
      })
    }
  }

  confirm(){
    const data={
      newFirstname:this.newFirstname,
      newLastname:this.newLastname,
      newMail:this.newMail,
      newPhone:this.newPhone,
      newCard:this.newCard,
      newAddress: this.newAddress,
      username:this.loggedUsername,
      photo: ""
    }
    if(this.newCard!="" && !this.isValidCreditCard(this.newCard)){
      this.message="Br. kartice nije u odgovarajućem formatu"
      return
    }
    else if(this.newMail!="" && !this.isValidEmail(this.newMail)){
      this.message="Mejl nije u odgovarajućem formatu"
      return
    }
    else{
      this.message=""
      if (this.photo) 
        {
          const reader = new FileReader();
          reader.onloadend = () => {
          data.photo = reader.result as string;
          this.service.updateData(data).subscribe(data=>{
            if(data){
              alert(data.msg)
              localStorage.removeItem("update")
              this.router.navigate(["admin"])
            }
          })
          };
          reader.readAsDataURL(this.photo);
        } 
        else
        {
          this.service.updateData(data).subscribe(data=>{
            if(data){
              alert(data.msg)
              localStorage.removeItem("update")
              this.router.navigate(["admin"])
            }
          })
        }
    }
  }

  handleFileInput(event: any) 
  {

    const file: File = event.target.files[0];

    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') 
      {
        const image = new Image();
        const reader = new FileReader();

        reader.onload = (e: any) => {
          image.src = e.target.result;
          image.onload = () => {
            if (image.width >= 100 && image.height >= 100 && image.width <= 300 && image.height <= 300) 
            {
              this.photo = file;
              this.message2="Slika je odgovarajuća"
            } 
            else 
            {
              this.photo=null
              this.message2="Slika nije u dozvoljenim dimenzijama, nece biti promenjena"
            }
            
          };
        };

        reader.readAsDataURL(file);
      }
      else 
      {
        this.photo=null
        this.message2="Slika nije u JPG/PNG formatu, nece biti promenjena"
      }
    }

    
  }

  isValidCreditCard(creditCardNumber: string): boolean 
  {
    const cleanedNumber = creditCardNumber.replace(/\s/g, '');
    return cleanedNumber.length === 16 && /^\d+$/.test(cleanedNumber);
  }
  isValidEmail(email: string): boolean 
  {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }


}
