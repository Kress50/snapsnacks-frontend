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
        <div className="fixed z-20 flex w-full -translate-y-7 select-none justify-center bg-amber-500 py-1 text-white transition-transform hover:translate-y-0">
          <span className="font-bold">Please verify your email</span>
        </div>
      )}
      <header className="fixed z-10 mx-auto flex w-full items-center justify-between bg-white px-4 py-2 xl:px-80">
        <Link className="flex items-center outline-none" to="/">
          <Logo size="w-16" />
          <h1 className="ml-4 select-none text-3xl font-bold text-amber-500">
            Snap
            <span className="text-slate-800">Snacks</span>
          </h1>
        </Link>
        <Link
          role="profile-button"
          className="outline-none focus:text-amber-500"
          to="/edit-profile"
        >
          <FontAwesomeIcon
            icon={faUser}
            className="cursor-pointer p-4 text-xl text-slate-800 hover:text-amber-500  active:text-orange-500"
          />
        </Link>
      </header>
    </>
  );
};

export default Header;
