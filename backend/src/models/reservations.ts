import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema(
    {
        restaurantId: Number,
        dateTime: String,
        number: Number,
        description: String,
        extended: Boolean,
        grade: Number,
        comment: String,
        username: String,
        waiter: String,
        tableId: Number
    },{
      versionKey:false  
    }
);

export default mongoose.model('ReservationModel', reservationSchema, 'reservations');