import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

//Route for user login
const loginUser = async (req, res) => {


}       

//route for user register
const registerUser = async (req, res) => {
    try {
        
        const {name,email,password} = req.body;

        // checking user is allready exist or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User Already Exist"});
        }


        // validating emai formate and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please ender a valid Email"});
        }
        if(password.length < 8){
            return res.json({success:false, message: "Password must be at least 8 characters"});
        }

        // hashing user password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = await user.generateAuthToken();

    } catch (error) {
        
    }
}

//Route for admin login
const adminLogin = async (req, res) => {


}


export { loginUser, registerUser, adminLogin }