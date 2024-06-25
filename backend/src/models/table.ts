import mongoose from 'mongoose'

const tableSchema = new mongoose.Schema(
    {
        idT: Number,
        taken: Array,
        numberSeats: Number
    },{
      versionKey:false  
    }
);

export default mongoose.model('TableModel', tableSchema);