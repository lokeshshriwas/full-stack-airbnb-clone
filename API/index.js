if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const port = 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const auth = require("./controller/auth.js");
const profile = require("./controller/profile.js");
const upload = require("./controller/upload.js");
const listing = require("./controller/listing.js");
const booking = require("./controller/booking.js");
const search = require("./controller/search.js");
const Booking = require("./models/booking.js");

// const corsOptions = {
//   origin: "https://skystay.netlify.app",
//   credentials: true,
//   optionSuccessStatus: 200,
//   methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
// };

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://skystay.netlify.app");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  // res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")

  next()
});

app.use(cors(corsOptions))

mongoose.connect(process.env.MONGODB_URL);

// middlewares
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const photoMiddleware = multer({ dest: "uploads" });

// personal details
app.post("/register", auth.register);
app.post("/login", auth.login);
app.post("/logout", auth.logout);

// profile details
app.get("/profile", profile.getProfile);
app.get("/places", profile.myListedPlaces);
app.post("/places", profile.uploadNewPlace);
app.put("/places", profile.editPlaceDetails);
app.get("/places/:id", profile.placeInDetail);

// uploading images
app.post("/upload-by-link", upload.uploadByLink);
app.post(
  "/upload",
  photoMiddleware.array("photos", 100),
  upload.uploadFromDevice
);

// getting all listings and detail of listing
app.get("/listings", listing.getListings);
app.get("/listings/:id", listing.getListingDetail);

// Creating new booking and getting booking details
app.get("/booking", booking.getBooking);
app.post("/booking", booking.newBooking);

// filter and searching
app.get("/filter/:category", search.filterByCategory);
app.get("/search", search.filterBySearch);

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});
