import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema(
    {
        taken: String,
        numberSeats: Number
    },{
      versionKey:false  
    }
);

export default mongoose.model('TableModel', tableSchema);