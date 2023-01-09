import { gql, useQuery } from "@apollo/client";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../api/fragments";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../api/types/restaurantsPageQuery";
import Category from "../../components/UI/Category";
import PaginationButton from "../../components/UI/PaginationButton";
import RestaurantCard from "../../components/UI/RestaurantCard";

interface IFormProps {
  searchTerm: string;
}

const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($restaurantsInput: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    Restaurants(input: $restaurantsInput) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

const Restaurants = () => {
  //Search form
  const { register, handleSubmit, getValues } = useForm<IFormProps>();

  //Pagination handing
  const [page, setPage] = useState(1);

  //Programmatic navigation after search query
  const navigate = useNavigate();

  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: { page },
    },
  });

  function onSearchSubmitHandler() {
    const { searchTerm } = getValues();
    navigate({
      pathname: "/search",
      search: `?term=${searchTerm}`,
    });
  }

  function nextPageHandler() {
    setPage((prev) => prev + 1);
  }
  function prevPageHandler() {
    setPage((prev) => prev - 1);
  }

  return (
    <>
      <Helmet>
        <title>Restaurants | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">
        <form
          onSubmit={handleSubmit(onSearchSubmitHandler)}
          className="flex w-full items-center justify-center bg-gradient-to-tr from-slate-900 to-slate-700 py-40"
        >
          <input
            {...register("searchTerm", { required: true, min: 3 })}
            type="search"
            className="input mx-4 w-full max-w-2xl focus:outline-2 focus:outline-amber-500 focus:ring-0 sm:mx-16"
            placeholder="Search Restaurants"
          />
        </form>
        {!loading && (
          <div className="mx-4 mb-16 sm:mx-16">
            <div className="my-4 flex flex-wrap justify-center gap-12">
              {data?.allCategories.categories?.map((category) => (
                <Link key={category.name} to={`/category/${category.slug}`}>
                  <Category image={category.coverImage} name={category.name} />
                </Link>
              ))}
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {data?.Restaurants.restaurants?.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  categoryName={restaurant.category?.name}
                  name={restaurant.name}
                  image={restaurant.coverImage}
                  id={restaurant.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {data?.Restaurants.totalPages !== 1 && (
        <div className="my-10 mx-auto grid max-w-md grid-cols-3 place-items-center">
          {page === data?.Restaurants.totalPages ? (
            <PaginationButton func={prevPageHandler} arrow={faArrowLeft} />
          ) : (
            <div></div>
          )}
          <span className="select-none text-lg font-semibold">
            Page {page} of {data?.Restaurants.totalPages}
          </span>
          {page !== data?.Restaurants.totalPages ? (
            <PaginationButton func={nextPageHandler} arrow={faArrowRight} />
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
};

export default Restaurants;
