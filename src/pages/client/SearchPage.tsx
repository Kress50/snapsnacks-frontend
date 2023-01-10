import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../api/fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../api/types/searchRestaurant";
import Pagination from "../../components/Pagination";
import RestaurantsList from "../../components/RestaurantsList";
import SearchBar from "../../components/SearchBar";

const SEARCH_RESTAURANT_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  query searchRestaurant($searchRestaurantInput: SearchRestaurantInput!) {
    searchRestaurant(input: $searchRestaurantInput) {
      error
      ok
      totalPages
      totalItems
      restaurants {
        ...RestaurantParts
      }
    }
  }
`;

const SearchPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, searchTerm] = window.location.href.split("?term=");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [queryReady, { data, loading }] = useLazyQuery<
    searchRestaurant,
    searchRestaurantVariables
  >(SEARCH_RESTAURANT_QUERY);
  useEffect(() => {
    if (!searchTerm) {
      navigate("/error");
    }
    queryReady({
      variables: {
        searchRestaurantInput: {
          page: page,
          query: searchTerm,
        },
      },
    });
  }, [navigate, page, searchTerm, queryReady]);

  return (
    <>
      <Helmet>
        <title>{searchTerm || "Search"} | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">
        <SearchBar />
        {!loading && (
          <div className="mx-4 my-4 mb-16 sm:mx-16">
            <h2 className="flex -translate-y-32 flex-col justify-center gap-1 text-center text-xl font-semibold text-white">
              Looking for restaurants with the name:
              <span className="mx-auto max-w-sm truncate font-bold text-amber-500">
                {searchTerm}
              </span>
            </h2>
            {data?.searchRestaurant.totalItems !== 0 ? (
              <RestaurantsList data={data?.searchRestaurant} />
            ) : (
              <span className="mt-12 flex justify-center text-3xl font-semibold">
                No restaurants found
              </span>
            )}
          </div>
        )}
      </div>
      <Pagination data={data?.searchRestaurant} page={page} setPage={setPage} />
    </>
  );
};

export default SearchPage;
