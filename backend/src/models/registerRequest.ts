import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        question: String,
        answer: String,
        firstname: String,
        lastname: String,
        gender: String,
        address: String,
        phone: String,
        mail: String,
        photo: String,
        card: String,
        type: String,
        salt: String,
        deactivated: Boolean
    },{
      versionKey:false  
    }
);

export default mongoose.model('RegisterRequestModel', registerSchema, 'regRequests');

/*
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




*/