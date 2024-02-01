require('dotenv').config()
const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")

const corsOptions ={
    origin:'http://localhost:5173', 
    credentials:true, 
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}));

const User = require("./models/user.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

mongoose.connect(process.env.MONGODB_URL);
 


app.get("/test", (req, res)=> {
    res.json("test" )
})

app.post("/register", async (req, res)=>{
    const {username, email, password} = req.body
    try {
        const newUser = await User.create({
            username,
            email,
            password : bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(newUser)
    
    } catch (error) {
        res.status(422).json(error)
    }
})

app.post("/login", async (req, res)=>{
    const {email, password} = req.body;
   try {
    const userDoc = await User.findOne({email})
    if(userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {} , (err, token)=>{
                if(err) throw err
                res.cookie("token", token)
                .json(userDoc)
            })
        }else{
            res.json("password incorrect")
        }
    } else{
        res.json("user not found")
    }
   } catch (error) {
    console.log(error)
   }
})


app.get("/profile", (req, res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token, jwtSecret, {} , async (err, userData)=>{
            if(err) throw err
            const {username, email, id} = await User.findById(userData.id)
            res.json({username, email, id})
        })
    }else{
        res.json(null)
    }
})

app.post("/logout", (req, res)=>{
    res.cookie("token", "").json(true)
})

app.listen(3000)