import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../api/fragments";
import {
  restaurantsPageQuery,
  restaurantsPageQueryVariables,
} from "../../api/types/restaurantsPageQuery";
import CategoryList from "../../components/CategoryList";
import Pagination from "../../components/Pagination";
import RestaurantsList from "../../components/RestaurantsList";
import SearchBar from "../../components/SearchBar";

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
  //Pagination handing
  const [page, setPage] = useState(1);

  const { data, loading } = useQuery<
    restaurantsPageQuery,
    restaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      restaurantsInput: { page },
    },
  });

  return (
    <>
      <Helmet>
        <title>Restaurants | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">
        <SearchBar />
        {!loading && (
          <div className="mx-4 mb-16 sm:mx-16">
            <CategoryList data={data} />
            <RestaurantsList data={data} />
          </div>
        )}
      </div>
      <Pagination data={data} page={page} setPage={setPage} />
    </>
  );
};

export default Restaurants;
