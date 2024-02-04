import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [listing, setListing] = useState([]);
  useEffect(() => {
    axios.get("/listings").then((response) => {
      const { data } = response;
      setListing(data);
    });
  }, []);

  console.log(listing);
  return (
    <div className=" m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4 mt-8">
      {listing.map((list) => (
        <Link to={`/listings/${list._id}`}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            <img
              src={`http://localhost:3000/uploads/${list.photos[0]}`}
              alt="listing-image"
              className="object-cover rounded-xl aspect-square "
            />
          </div>
          <h3 className="font-bold">{list.address}</h3>
          <p className="text-sm text-gray-500 truncate">{list.title.slice(0,25)}<b>...more</b></p>
          <h4 className="mt-1 "><b>₹{list.price}</b> <span>night</span></h4>
        </Link>
      ))}
    </div>
  );
};

export default Home;
