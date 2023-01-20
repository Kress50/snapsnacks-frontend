interface IDishProps {
  description: string;
  name: string;
  price: number;
}

const Dish: React.FC<IDishProps> = ({ description, name, price }) => {
  return <div>dish</div>;
};

export default Dish;
