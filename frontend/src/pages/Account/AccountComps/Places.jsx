import React from "react";
import { Link, useParams } from "react-router-dom";
import icons from "../../../assets/icons/icons";

const Places = () => {
  const { action } = useParams();
  return (
    <div className="mt-8 w-full">
      {action !== "new" && (
        <div className="text-center">
          <Link
            to={"/account/places/new"}
            className="bg-primary text-white py-2 px-4 rounded-full inline-flex max-w-sm gap-1"
          >
            {icons.plus}
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <form action="">
          <h2 className="text-2xl">Title</h2>
          <p className="text-gray-500 text-sm">
            Title for your place should be short and catchy as in advertisement{" "}
          </p>
          <input
            type="text"
            placeholder="title,for example for my appartment"
            className="w-full rounded-full"
          />
          <h2 className="text-2xl mt-4">Address</h2>
          <p className="text-gray-500 text-sm">Address to this place </p>
          <input
            type="text"
            placeholder="address"
            className="w-full rounded-full"
          />
          <h2 className="text-2xl mt-4">Photos</h2>
          <p className="text-gray-500 text-sm">More = better</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add using a link......jpg png"
              className="w-full rounded-full"
            />
            <button className="bg-gray-500 text-white px-4 py-2 rounded-2xl">
              Add&nbsp;photo
            </button>
          </div>
          <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid=cols-6">
            <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-500 w-auto flex justify-center items-center">
              {icons.upload}
            </button>
          </div>
          <div>
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">Description of the place</p>
            <textarea
              className="border rounded-2xl"
              cols="60"
              rows="10"
              placeholder="Description of the place"
            />
          </div>

          <div>
            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">
              Select all the perks of your place
            </p>
            <div className="grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 gap-2">
              <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
                <input type="checkbox" />
                {icons.wifi}
                <span>Wifi</span>
              </label>
              <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
                <input type="checkbox" />
                {icons.parking}
                <span>Parking</span>
              </label>
              <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
                <input type="checkbox" />
                {icons.TV}
                <span>TV</span>
              </label>
              <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
                <input type="checkbox" />
                {icons.Kitchen}
                <span>Kitchen</span>
              </label>
              <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
                <input type="checkbox" />
                {icons.pet}
                <span>Pet</span>
              </label>
              <label className="flex items-center justify-start border rounded-xl p-4 gap-2">
                <input type="checkbox" />
                {icons.private}
                <span>Private entrance</span>
              </label>
            </div>
          </div>
          <div>
            <h2  className="text-2xl mt-4" >Check IN & OUT times</h2>
            <p className="text-gray-500 text-sm">add check in add out times remember to have time window for cleaning the room between guests</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
            <div>
              <h3>Check in time</h3>
              <input type="time" placeholder="01:00" className="border w-full" />
            </div>
            <div>
              <h3>Check out time</h3>
              <input type="time" placeholder="12:00" className="border w-full" />
            </div>
            <div>
              <h3>Number of guests</h3>
              <input type="number" placeholder="" className="border w-full" />
            </div>
          </div>
          </div>
        
          <div>
            <h2 className="text-2xl mt-4">Extra info</h2>
            <p className="text-gray-500 text-sm">house rules etc.</p>
            <textarea cols="60" rows="10" className="border rounded-2xl" />
          </div>

          <button className="min-w-56 rounded-full bg-primary text-white py-2 text-xl font-bold">Save</button>
        </form>
      )}
    </div>
  );
};

export default Places;
