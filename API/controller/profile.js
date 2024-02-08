const User = require("../models/user");
const Place = require("../models/places");
const jwt = require("jsonwebtoken");
const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

module.exports.getProfile = (req, res) => {
  const { token } = req.cookies;
  try {
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const { username, email, id } = await User.findById(userData.id);
        res.json({ username, email, id });
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.myListedPlaces = (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { id } = userData;
      res.json(await Place.find({ owner: id }));
    });
  } catch (error) {
    console.log("Error finding my listed places", error);
  }
};

module.exports.editPlaceDetails = async (req, res) => {
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
    category,
  } = req.body;

  try {
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
          category,
        });
        await placeDoc.save();
        res.json("ok");
      }
    });
  } catch (error) {
    console.log("Error in updating place details", error);
  }
};

module.exports.uploadNewPlace = async (req, res) => {
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
    category,
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
      category,
    });
    res.json(placeDoc);
  });
};

module.exports.placeInDetail = async (req, res) => {
  const { id } = req.params;
  const place = await Place.findById(id);
  res.json(place);
};
