interface IRestaurantCardProps {
  name: string;
  promoted: boolean;
  categoryName: string;
  image: string | null;
  id: number;
}

const RestaurantCard: React.FC<IRestaurantCardProps> = ({
  name,
  categoryName,
  image,
  promoted,
}) => {
  return (
    <div className="group flex cursor-pointer flex-col justify-start transition-all">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={`mb-2 rounded-sm bg-cover bg-center p-20 ${
          promoted ? "shadow-restaurant shadow-amber-500" : ""
        }`}
      ></div>
      <h3 className="pb-1 text-xl font-semibold group-hover:text-amber-500">
        {name}
      </h3>
      <span className="border-t border-gray-300 pt-1 text-sm opacity-50">
        {categoryName}
      </span>
    </div>
  );
};

export default RestaurantCard;
