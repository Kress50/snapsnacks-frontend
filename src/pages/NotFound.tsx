import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/UI/Logo";

const NotFound = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 5000);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Logo size="w-20" />
          <div className="mt-4 select-none bg-gradient-to-tr from-orange-500 to-amber-400 bg-clip-text text-center text-3xl font-bold text-transparent">
            404 Not Found
          </div>
          <div className="mt-4 font-medium">
            You will be redirected to main page in 5 seconds automatically or{" "}
            <Link to="/" className="link">
              click here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
