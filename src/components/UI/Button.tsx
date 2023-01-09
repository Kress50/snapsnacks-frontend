interface IButtonProps {
  actionText: string;
  canClick: boolean;
  loading: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  actionText,
  canClick,
  loading,
}) => {
  return (
    <button
      className={`select-none rounded-md py-3 px-5 text-lg font-semibold text-white shadow-sm outline-none transition-colors ${
        canClick
          ? "bg-amber-500 hover:brightness-110 focus:bg-orange-500 active:bg-amber-500"
          : "pointer-events-none bg-gray-300"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
