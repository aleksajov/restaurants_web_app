import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private servis: UserService,
    private router: Router){}

  username: string = ""
  password: string = ""
  err: string=""

  login(){
    if(this.username=="" || this.password==""){
      this.err="Unesite sve podatke"
      return
    }
    else{
      this.err=""
      this.servis.login(this.username, this.password).subscribe(
        data=>{
          
          if(data==null){
            this.err="Neispravni podaci"
          }
          else {
            this.err=""
            localStorage.setItem("logged", JSON.stringify(data.username))
            this.router.navigate([data.type])
          }
        }
      )
    }
    
  }

}
