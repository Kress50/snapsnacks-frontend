import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

interface IPaginationButtonProps {
  func: MouseEventHandler;
  arrow: IconProp;
}

const PaginationButton: React.FC<IPaginationButtonProps> = ({
  func,
  arrow,
}) => {
  return (
    <button
      onClick={func}
      className="h-10 w-10 rounded-full outline-none hover:text-amber-500 active:brightness-110"
    >
      <FontAwesomeIcon icon={arrow} />
    </button>
  );
};

export default PaginationButton;
