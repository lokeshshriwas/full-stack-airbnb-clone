const Booking = require("../models/booking.js");
const jwt = require("jsonwebtoken");
const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

module.exports.newBooking = async (req, res) => {
  let { place, checkIn, checkOut, mobile, numberOfGuests, name, price } =
    req.body;
  jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
    if (err) console.log("not getting user", err);
    const bookingDoc = await Booking.create({
      place,
      checkIn,
      checkOut,
      mobile,
      numberOfGuests,
      name,
      price,
      user: userData.id,
    });
    res.json(bookingDoc);
  });
};

module.exports.getBooking = async (req, res) => {
  try {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) console.log("not getting user", err);
      res.json(await Booking.find({ user: userData.id }).populate("place"));
    });
  } catch (error) {
    console.log("Error in geting booking place", error);
  }
};
