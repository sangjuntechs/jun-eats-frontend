import React from "react";
import { Link } from "react-router-dom";

interface IRestaurantProps {
    id: string;
    coverImage: string;
    name: string;
    categoryName?: string;
    address: string;
}

const RestaurantsComp: React.FC<IRestaurantProps> = ({id, coverImage, name, categoryName, address}) => {
  const Img = coverImage;
  return (
    <Link to={`/restaurants/${id}`}>
    <div className="m-3 hover:opacity-70 transition-opacity">
      <img className="h-2/6" src={Img} alt="aa"/>
      <h3 className="md:text-lg text-base font-semibold tracking-wide">{name}</h3>
      <span className="flex md:text-sm text-xs pb-1 transform -translate-y-1">
        {address}
      </span>
      <span className="border-t border-gray-300 w-full block text-xs text-gray-500 py-2">
        {categoryName}
      </span>
    </div>
    </Link>
  );
};

export default RestaurantsComp;
