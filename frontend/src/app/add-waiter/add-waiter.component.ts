import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-waiter',
  templateUrl: './add-waiter.component.html',
  styleUrls: ['./add-waiter.component.css']
})
export class AddWaiterComponent {
  constructor(private service: UserService, private http: HttpClient){}
  ngOnInit(): void {
    this.message=""
    this.message2=""
    this.message3=""
    this.username=""
    this.password=""
    this.question=""
    this.answer=""
    this.firstname=""
    this.lastname=""
    this.gender=""
    this.address=""
    this.phone=""
    this.mail=""
    this.photo=null
    this.idR=""
  }

  username: string = ""
  password: string = ""
  question: string = ""
  answer: string = ""
  firstname: string = ""
  lastname: string = ""
  gender: string = ""
  address: string = ""
  phone: string = ""
  mail: string = ""
  photo: File | null = null;
  idR: string = ""

  message: string = ""
  message2:string=""
  message3:string=""

  register() {
    if (this.username == "" ||
      this.password == "" ||
      this.question == "" ||
      this.answer == "" ||
      this.firstname == "" ||
      this.lastname == "" ||
      this.gender == "" ||
      this.address == "" ||
      this.phone == "" ||
      this.mail == "" ||
      this.idR == ""
    ) {
      this.message = "Nisu uneti svi podaci!"
      return
    }
    else if (!this.isValidPassword(this.password)) 
    {
      this.message = "Lozinka mora imati 6-10 karaktera, najmanje jedno veliko, tri mala slova, jedan broj i jedan specijalan karakter, i počinjati slovom"
      return
    }
    else if (!this.isValidEmail(this.mail))
    {
      this.message = "Mejl nije u odgovarajućem formatu"
    }
    else 
    {
      this.message = ""
      const data = {
            username:this.username,
            password: this.password,
            question: this.question,
            answer: this.answer,
            firstname: this.firstname,
            lastname: this.lastname,
            gender: this.gender,
            address: this.address,
            phone: this.phone,
            mail: this.mail,
            idR: parseInt(this.idR),
            photo: "",
            deactivated: false
          };
      if (this.photo) 
      {
        const reader = new FileReader();
        reader.onloadend = () => {
        data.photo = reader.result as string;
        this.service.addWaiter(data).subscribe(data=>{
          if(data){
            
            if(data.msg=="Konobar dodat")
            {
              alert(data.msg)
              this.ngOnInit()
            }
            else{
              this.message3=data.msg
            }
              
          }
        })
        };
        reader.readAsDataURL(this.photo);
      } 
      else
      {
        this.loadDefaultProfileImage(data)
      }
      
    }
  }
  loadDefaultProfileImage(data: any) {
    this.http.get('assets/defaultPhoto.jpg', { responseType: 'blob' }).subscribe({
        next: (response) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            data.photo = reader.result as string;
            this.service.addWaiter(data).subscribe(data=>{
              if(data){
                if(data.msg=="Konobar dodat")
                  {
                    alert(data.msg)
                    this.ngOnInit()
                  }
                  else{
                    this.message3=data.msg
                  }
              }
            })
          };
          reader.readAsDataURL(response);
        },
        error: (error) => {
          console.error('Greška pri učitavanju podrazumevane slike:', error);
        }
      });
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

  isValidPassword(password: string): boolean 
  {
    const regex = /^(?=.*[A-Z])(?=.*[a-z]{3})(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z][A-Za-z\d!@#$%^&*()_+]{5,9}$/;
    return regex.test(password);
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
              this.message2="Slika nije u dozvoljenim dimenzijama, ukoliko ne odaberete odgovarajuću koristiće se podrazumevana"
              
            }
            
          };
        };

        reader.readAsDataURL(file);
      }
      else 
      {
        this.photo=null
        this.message2="Slika nije u JPG/PNG formatu, ukoliko ne odaberete odgovarajuću koristiće se podrazumevana"
        
      }
    }

    
  }

}
