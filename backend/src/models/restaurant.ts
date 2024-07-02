import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        address: String,
        type: String,
        phone: String,
        mapUrl: String,
        workingTime: Array,
        tables: [{idT:Number, numberSeats: Number, taken: Array}],
        menu: Array
    },{
      versionKey:false  
    }
);

export default mongoose.model('RestaurantModel', restaurantSchema, 'restaurants');