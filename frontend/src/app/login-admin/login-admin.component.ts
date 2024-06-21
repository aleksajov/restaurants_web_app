import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
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
    this.servis.loginAdmin(this.username, this.password).subscribe(
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
