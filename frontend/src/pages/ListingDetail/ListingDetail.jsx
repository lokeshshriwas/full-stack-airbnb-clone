import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import icons from "../../assets/icons/icons";
import BookingWidget from "./BookingWidget";

const ListingDetail = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/listings/${id}`).then((response) => {
      const { data } = response;
      setDetails(data);
    });
  }, [id]);

  if (showPhotos) {
    return (
      <div className="w-full absolute bg-black inset-0 min-h-screen">
        <div className="p-8 bg-black grid gap-4 ">
          <div>
            <h1 className="text-white text-2xl mr-48">{details.title}</h1>
            <button
              onClick={() => {
                setShowPhotos(false);
              }}
              className="fixed right-12 top-10 text-black flex gap-1 bg-gray-400 px-2 py-1 rounded-lg items-center font-semibold shadow shadow-gray-500"
            >
              {icons.cross}Close photos
            </button>
          </div>
          {details?.photos?.length > 0 &&
            details.photos.map((photo) => (
              <div className="" key={photo}>
                <img
                  src={`http://localhost:3000/uploads/${photo}`}
                  alt="image"
                  className="sm:w-full md:w-4/5 m-auto"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 w-full px-8 lg:w-5/6 mx-auto">
      <h1 className="text-2xl font-semibold">{details.title}</h1>
      <div className="flex gap-1 items-center ">
        {icons.location}
        <a
          target="_blank"
          href={`https://www.google.com/maps/place/${details.address}`}
          className="text-sm font-bold underline"
        >
          {details.address}
        </a>
      </div>

      <div className="w-full gap-2 grid grid-cols-[2fr_1fr] mt-4 rounded-3xl overflow-hidden relative">
        <div>
          {details?.photos?.[0] && (
            <img
              onClick={() => {
                setShowPhotos(true);
              }}
              className="aspect-square object-cover cursor-pointer w-full"
              src={`http://localhost:3000/uploads/${details?.photos[0]}`}
              alt="image"
            />
          )}
        </div>
        <div className="grid">
          {details?.photos?.[1] && (
            <img
              onClick={() => {
                setShowPhotos(true);
              }}
              className="aspect-square cursor-pointer"
              src={`http://localhost:3000/uploads/${details?.photos[1]}`}
              alt="image"
            />
          )}
          <div className="overflow-hidden">
            {details?.photos?.[1] && (
              <img
                onClick={() => {
                  setShowPhotos(true);
                }}
                className="aspect-square object-cover relative top-2 cursor-pointer"
                src={`http://localhost:3000/uploads/${details?.photos[2]}`}
                alt="image"
              />
            )}
          </div>
        </div>
        <button
          className="absolute flex gap-1 items-center bottom-2 right-2 border-2 border-black px-4 py-1 rounded-md bg-white font-semibold"
          onClick={() => setShowPhotos(true)}
        >
          {icons.list}
          Show all photos
        </button>
      </div>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] my-4">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-xl">Description</h2>
            <p>{details.description}</p>
          </div>
          Check-In: <b>{details.checkIn}</b>
          <br />
          Check-Out: <b>{details.checkOut}</b>
          <br />
          Max number of guests: <b>{details.maxGuests}</b>
        </div>
        <BookingWidget details={details} />
      </div>
      <div className="bg-white pt-4 border-t">
        <h2 className="font-semibold text-xl">ExtraInfo</h2>
        <div className="text-sm text-gray-500 leading-4 mb-4 mt-2">
          {details.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
