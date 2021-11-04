import React from "react";

interface IDishProps {
  name: string;
  price: number;
  description: string;
}

export const DishComp: React.FC<IDishProps> = ({
  description,
  name,
  price,
}) => {
  return (
   <div className="flex flex-col p-7 border border-gray-300 hover:border-gray-600 cursor-pointer mb-14 justify-center">
      <p className="font-medium text-xl">{name}</p>
      <p className="text-sm text-gray-600 font-light">{description}</p>
      <p className="mt-6 font-mono">{price} 원</p>
  </div>
);
};
