import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.css']
})
export class ForgottenComponent implements OnInit{



username: string=""
message: string=""
show: boolean=false
logged: User | null=new User()
answerQuest: string=""
showNew: boolean=false
newPass1: string=""
newPass2: string=""

answer(){
  if(this.answerQuest==""){
    this.message="Odgovorite na pitanje"
    return
  }
  if(this.answerQuest==this.logged?.answer){
    this.message=""
    this.showNew=true
    this.show=false
  }
  else{
    this.message="Netacan odgovor"
  }
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
    if(this.logged){
      this.service.changePass(this.logged.username, this.newPass1).subscribe(data=>{
        if(data){
          alert(data.msg)
          if (data.msg == "Lozinka ažurirana") {
            localStorage.removeItem("logged")
            this.showNew=false
            if (this.logged!.type == "admin")
              this.router.navigate(["loginAdmin"])
            else
              this.router.navigate(["login"])
          }
        }
      })
    }
    else{
      this.message="NIJE ODABRAN KORISNIK"
    }
    
  }
}

isValidPassword(password: string): boolean 
  {
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z][A-Za-z\d!@#$%^&*()_+]{5,9}$/;
    return regex.test(password);
  }

click(){
  if(this.username==""){
    this.message="Unesite korisničko ime"
    this.show=false
    return
  }
  this.service.getUser(this.username).subscribe(user=>{
    console.log(user)
    if(user){
      this.message=""
      this.show=true
      this.logged=user
    }
    else if(user==null){
      this.message="Ne postoji korisnik sa tim korisničkim imenom"
      this.show=false
    }
  })
}

constructor(private service:UserService, private router:Router){}


  ngOnInit(): void {
    this.show=false
    this.message=""
    this.username=""
    this.showNew=false
  }
}
