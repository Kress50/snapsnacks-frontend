import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useMeQuery } from "../hooks/useMeQuery";
import { Logo } from "./UI/Logo";

const Header = () => {
  const { data } = useMeQuery();

  return (
    <>
      {!data?.me.verified && (
        <div className="absolute flex w-full -translate-y-7 select-none justify-center bg-amber-500 py-1 text-white transition-transform hover:translate-y-0">
          <span className="font-bold">Please verify your email</span>
        </div>
      )}
      <header className="flex items-center justify-between px-4 py-2 sm:px-16">
        <Link className="flex items-center" to="/">
          <Logo size="w-16" />
          <h1 className="ml-4 select-none text-3xl font-bold text-amber-500">
            Snap
            <span className="text-black">Snacks</span>
          </h1>
        </Link>
        <Link to="/my-profile">
          <FontAwesomeIcon
            icon={faUser}
            className="cursor-pointer p-4 text-xl hover:text-amber-500 active:text-orange-500"
          />
        </Link>
      </header>
    </>
  );
};

export default Header;
