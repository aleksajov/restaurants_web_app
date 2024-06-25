import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
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
        deactivated: Boolean,
        idR: Number
    },{
      versionKey:false  
    }
);

export default mongoose.model('UserModel', userSchema, 'users');