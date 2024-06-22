import mongoose from 'mongoose'

const reservationReqSchema = new mongoose.Schema(
    {
        restaurantId: Number,
        dateTime: String,
        number: Number,
        description: String,
        extended: Boolean,
        grade: Number,
        comment: String,
        username: String
    },{
      versionKey:false  
    }
);

export default mongoose.model('ReservationRequestModel', reservationReqSchema, 'resRequests');