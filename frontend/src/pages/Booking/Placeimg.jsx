import React from "react";

const Placeimg = ({ place, index=0, className=null }) => {
    if(!place.photos.length){
        return ""
    }
    if(!className){
        className ="object-cover h-full w-full"
    }
  return (
    <img
      src={"http://localhost:3000/uploads/" + place.photos[index]}
      alt="image"
      className="object-cover grow "
    />
  );
};

export default Placeimg;
