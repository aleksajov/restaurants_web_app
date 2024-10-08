export class RegisterRequest{
    username: string=""
    password: string=""
    question: string=""
    answer: string=""
    firstname: string = ""
    lastname: string = ""
    gender: string=""
    address: string=""
    phone: string=""
    mail: string=""
    photo: File | null = null
    card: string=""
    type: string="guest"
    deactivated: boolean=false
}