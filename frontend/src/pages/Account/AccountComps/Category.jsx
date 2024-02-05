import React from "react";

const propertyCategories = [
  "Apartment",
  "House",
  "Villa",
  "Cottage",
  "Townhouse",
  "Guesthouse",
  "Bungalow",
  "Cabin",
  "Studio",
  "Treehouse",
  "Boathouse",
  "Tent",
  "Farmhouse",
  "Castle",
  "Mansion",
  "Resort",
  "Igloo",
  "Lighthouse",
  "Yurt",
  "Tipi",
  "Cave",
  "Other",
];

const PropertyDropdown = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <select
        className="border rounded-full w-3/5 mt-2 p-2"
        id="propertyCategory"
        name="propertyCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select category</option>
        {propertyCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {selectedCategory && <p className="text-xl mt-2">You selected: <b className="text-2xl text-gray-600 underline">{selectedCategory}</b></p>}
    </div>
  );
};

export default PropertyDropdown;
