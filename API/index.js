require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const downloader = require("image-downloader");
const multer = require("multer");
const Path = require("path");
const fs = require("fs");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//  imported models
const User = require("./models/user.js");
const Place = require("./models/places.js");
const Booking = require("./models/booking.js");
const { storage, cloudinary } = require("./cloudinary.js");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

mongoose.connect(process.env.MONGODB_URL);

app.get("/test", (req, res) => {
  res.json("test");
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(newUser);
  } catch (error) {
    res.status(422).json(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.json("password incorrect");
      }
    } else {
      res.json("user not found");
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { username, email, id } = await User.findById(userData.id);
      res.json({ username, email, id });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const response = await cloudinary.uploader.upload(link, {folder: "skystay"})
  res.json(response.url)
});

const photoMiddleware = multer({ dest: "uploads" });

app.post("/upload", photoMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path } = req.files[i];
    const response = await cloudinary.uploader.upload(path, {folder: "skystay"})
    const {url} = response
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post("/places", async (req, res) => {
  const {
    title,
    price,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    category
  } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      price,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      category
    });
    res.json(placeDoc);
  });
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.json(place);
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    price,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    category
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);

    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        price,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        category
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("/listings", async (req, res) => {
  const data = await Place.find({});
  res.json(data);
});

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

function getUserDataFromReq(req){
  return new Promise ((resolve, reject)=>{
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData)
    });
  });
};

app.post("/booking", async (req, res) => {
  const userData =await getUserDataFromReq(req)
  let { place, checkIn, checkOut, mobile, numberOfGuests, name, price } = req.body;
  const bookingDoc = await Booking.create({
    place, checkIn, checkOut, mobile, numberOfGuests, name, price, user: userData.id
  })
  res.json(bookingDoc)

});

app.get("/booking", async (req, res)=>{
  const userData = await getUserDataFromReq(req)
  res.json( await Booking.find({user:userData.id}).populate("place"))
})

app.get("/filter/:category" , async (req, res)=>{
  const {category} = req.params
  const searchResult = await Place.find({category: category})
  res.json(searchResult)
})

app.listen(3000);
