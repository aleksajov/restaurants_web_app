import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  //styleUrls: ['loggedUsername: string, password: string, password: string, password: stringonent.css']
  styleUrls: ['./change-password.component.css']

})
export class ChangePasswordComponent implements OnInit{
  password:string=""
  message: string=""
  newPass1: string=""
  newPass2: string=""
  loggedUsername:string=""
  logged:User=new User()
  
  show: boolean=false

  ngOnInit(): void {
    this.message=""
    let ls=localStorage.getItem("logged")
    if(ls){
      this.loggedUsername=JSON.parse(ls)
      this.service.getUser(this.loggedUsername).subscribe(data=>{
        if(data){
          this.logged=data
        }
      })
    }
  }

  constructor(private service:UserService, private router:Router){}

  oldPassConfirm(){
    this.service.checkPassword(this.loggedUsername, this.password).subscribe(data=>{
      if(data){
        if(data.msg=="ok"){
          this.message=""
          this.show=true
        }
        else if(data.msg=="false"){
          this.message="Netačna lozinka"
        }
      }
    })
  }

  isValidPassword(password: string): boolean 
  {
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z][A-Za-z\d!@#$%^&*()_+]{5,9}$/;
    return regex.test(password);
  }

  change(){
    if(this.newPass1=="" || this.newPass2==""){
      this.message="Morate uneti lozinku u oba polja"
      return
    }
    else if(!this.isValidPassword(this.newPass1)){
      this.message="Lozinka mora imati 6-10 karaktera, najmanje jedno veliko, tri mala slova, jedan broj i jedan specijalan karakter, i počinjati slovom"
      return
    }
    else if(this.newPass1!=this.newPass2){
      this.message="Lozinke se ne podudaraju"
      return
    }
    
    else{
      this.message=""
      this.service.changePass(this.loggedUsername, this.newPass1).subscribe(data=>{
        if(data){
          alert(data.msg)
          if (data.msg == "Lozinka ažurirana") {
            localStorage.removeItem("logged")
            if (this.logged.type == "admin")
              this.router.navigate(["loginAdmin"])
            else
              this.router.navigate(["login"])
          }
        }
      })
    }
  }


  

  
}
