import React from "react";

interface IRestaurantProps {
    id: string;
    coverImage: string;
    name: string;
    categoryName?: string;
    address: string;
}

const RestaurantsComp: React.FC<IRestaurantProps> = ({coverImage, name, categoryName, address}) => {
  return (
    <div className="m-3">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="bg-gray-400 p-32 bg-cover mb-3"
      ></div>
      <h3 className="text-lg font-semibold tracking-wide">{name}</h3>
      <span className="flex text-sm pb-1 transform -translate-y-1">
        {address}
      </span>
      <span className="border-t border-gray-300 w-full block text-xs text-gray-500 py-2">
        {categoryName}
      </span>
    </div>
  );
};

export default RestaurantsComp;
