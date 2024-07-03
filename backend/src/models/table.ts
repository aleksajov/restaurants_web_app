import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema(
    {
        idT: Number,
        taken: Array,
        numberSeats: Number,
        xCoord:Number,
        yCoord:Number,
        radius:Number
    },{
      versionKey:false  
    }
);

export default mongoose.model('TableModel', tableSchema);