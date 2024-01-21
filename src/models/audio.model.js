import mongoose from "mongoose";

const audioSchema = mongoose.Schema({
    name: {type: String,required:true,trim:true},
    author: {type: String,trim:true,default:null},
    audio:{
        audioURL: {type: String},
        public_id: {type: String},
    }
},{timestamps: true});

export default mongoose.model('Audio', audioSchema)