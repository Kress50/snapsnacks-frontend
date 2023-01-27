import React from "react";

interface IRestaurantHeroProps {
  coverImage: string;
  isPromoted: boolean;
  name: string;
  categoryName: string;
  address: string;
}

const RestaurantHero: React.FC<IRestaurantHeroProps> = ({
  coverImage,
  isPromoted,
  name,
  categoryName,
  address,
}) => {
  return (
    <div
      className="bg-cover bg-center pb-80 opacity-90 shadow-xl"
      style={{
        backgroundImage: `url(${coverImage})`,
      }}
    >
      <div
        className={`relative top-24 flex w-1/2 flex-col bg-white py-4 pl-4 lg:w-3/12 xl:pl-20 ${
          isPromoted ? "shadow-promoted shadow-amber-500" : ""
        }`}
      >
        <h4 className="mb-3 text-3xl font-bold">{name}</h4>
        <h5 className="text-md mb-2 font-normal">{categoryName}</h5>
        <h6 className="border-t border-gray-300 pt-2 text-sm font-light">
          {address}
        </h6>
      </div>
    </div>
  );
};

export default RestaurantHero;
