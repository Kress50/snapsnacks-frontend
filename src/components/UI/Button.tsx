import { Link } from "react-router-dom";

interface IButtonProps {
  actionText: string;
  canClick: boolean;
  loading: boolean;
  link?: string;
}

export const Button: React.FC<IButtonProps> = ({
  actionText,
  canClick,
  loading,
  link = null,
}) => {
  const buttonOutput = loading ? "Loading..." : actionText;
  return (
    <button
      className={`select-none rounded-md py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors ${
        canClick
          ? "bg-amber-500 hover:bg-orange-400 focus:bg-orange-400 active:bg-amber-500"
          : "pointer-events-none bg-gray-300"
      }`}
    >
      {link ? <Link to={link}>{buttonOutput}</Link> : buttonOutput}
    </button>
  );
};
