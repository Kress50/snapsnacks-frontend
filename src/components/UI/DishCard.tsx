interface IDishProps {
  description: string;
  name: string;
  price: number;
  coverImage: string;
}

const DishCard: React.FC<IDishProps> = ({
  description,
  name,
  price,
  coverImage,
}) => {
  return (
    <div className="group flex h-28 w-full select-none justify-between border-2 pr-2 shadow-sm transition-all hover:border-amber-500">
      <div
        style={{ backgroundImage: `url(${coverImage})` }}
        className="bg-cover bg-center py-10 px-14"
      ></div>
      <div className="flex flex-col justify-between py-1">
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold">{name}</h3>
          <h4 className="text-sm">{description}</h4>
        </div>
        <div className="text-left text-xl font-bold">{price}$</div>
      </div>
    </div>
  );
};

export default DishCard;
