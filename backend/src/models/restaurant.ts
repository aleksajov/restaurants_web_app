import mongoose from 'mongoose'

const restaurantSchema = new mongoose.Schema(
    {
        id: Number,
        name: String,
        address: String,
        type: String,
        phone: String,
        comments: Array,
        mapUrl: String,
        waiters: Array,
        workingTime: Array,
        tables: Array,
        menu: Array
    },{
      versionKey:false  
    }
);

export default mongoose.model('RestaurantModel', restaurantSchema, 'restaurants');