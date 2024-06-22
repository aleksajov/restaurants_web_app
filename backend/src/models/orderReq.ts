import mongoose from 'mongoose'

const orderReqSchema = new mongoose.Schema(
    {
        username: String,
        idR: Number,
        items: [{idF: Number, quantity: Number}]
    },{
      versionKey:false  
    }
);

export default mongoose.model('OrderRequestModel', orderReqSchema, 'orderRequests');