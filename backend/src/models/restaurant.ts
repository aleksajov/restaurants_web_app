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
        short_desc:String,
        tables: [{idT:Number, numberSeats: Number, taken: Array, xCoord:Number,
          yCoord:Number,
          radius:Number}],
        menu: Array,
        kitchens:Array,
        toilets:Array
    },{
      versionKey:false  
    }
);

export default mongoose.model('RestaurantModel', restaurantSchema, 'restaurants');