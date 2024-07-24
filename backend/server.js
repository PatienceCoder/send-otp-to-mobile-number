const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config()
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173", //MAKE SURE TO ADD YOUR FRONTEND URL HERE
    credentials:true
}))
const client = new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);
//MAKE SURE TO UPDATE THE TWILIO_ACCOUNT_SID AND TWILIO_AUTH_TOKEN WITH YOUR CREDENTIALS
function generateOTP(){
    return Math.floor(1000 + Math.random() * 9000)
}
async function sendOTP(name,mobilenumber,otp){
    return client.messages.create({
        from:process.env.TWILIO_PHONE_NUMBER,
        to:mobilenumber,
        body:`Hi ${name} your otp is ${otp}`
    })
}
app.post('/sendotp',async(req,res) => {
    const {name,mobilenumber} = req.body;
    const otp = generateOTP()
    try{
        await sendOTP(name,mobilenumber,otp)
        return res.status(200).json({message:"Hi from backend"})
    }
    catch(err){
        console.error(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
    
})

app.listen(5000,() => {
    console.log('Server listening on port : 5000')
})