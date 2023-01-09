import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../api/fragments";
import {
  searchRestaurant,
  searchRestaurantVariables,
} from "../../api/types/searchRestaurant";

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
  const navigate = useNavigate();
  const [queryReady, { data, loading, called }] = useLazyQuery<
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
          page: 1,
          query: searchTerm,
        },
      },
    });
  }, [navigate, searchTerm, queryReady]);

  return (
    <>
      <Helmet>
        <title>{searchTerm || "Search"} | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">{searchTerm}</div>
    </>
  );
};

export default SearchPage;
