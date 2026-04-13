import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type : String, required: true},
    email: { type : String, required: true, unique: true},
    password: { type : String, required: true},
    cartData: { type : Object, default: {}},
    phonenumber: { type : String, default: ''},
    address: { type : String, default: ''},
    state: { type : String, default: ''},
    city: { type : String, default: ''},
    image: {type: String},
    pinCode: { type : String, default: ''},
    CountryCode: { type : String, default: ''},
    

},{minimize:false})

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel
