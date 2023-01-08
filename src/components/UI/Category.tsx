interface ICategoryProps {
  name: string;
  image: string | null;
}

const Category: React.FC<ICategoryProps> = ({ name, image }) => {
  return (
    <div className="grid w-16 cursor-pointer grid-rows-2 items-center justify-center text-center transition-all hover:scale-110 hover:text-amber-500 active:scale-105">
      <img
        className="flex items-center justify-center rounded-full bg-gray-200 p-2 ring-2 ring-gray-100"
        src={`${image}`}
        alt={name}
      />
      <div className="group text-sm font-semibold">{name}</div>
    </div>
  );
};

export default Category;
