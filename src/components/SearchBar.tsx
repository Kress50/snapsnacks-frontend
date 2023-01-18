import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface IFormProps {
  searchTerm: string;
}

const SearchBar = () => {
  const { register, handleSubmit, getValues } = useForm<IFormProps>();
  const navigate = useNavigate();

  function onSearchSubmitHandler() {
    const { searchTerm } = getValues();
    navigate({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSearchSubmitHandler)}
      className="flex w-full items-center justify-center bg-gradient-to-tr from-slate-900 to-slate-700 py-20"
    >
      <input
        {...register("searchTerm", { required: true, min: 3 })}
        type="search"
        className="input mx-4 w-full max-w-2xl focus:outline-2 focus:outline-amber-500 focus:ring-0 sm:mx-16"
        placeholder="Search Restaurants"
      />
    </form>
  );
};

export default SearchBar;
