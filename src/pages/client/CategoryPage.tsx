import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../api/fragments";
import { category, categoryVariables } from "../../api/types/category";
import CategoryList from "../../components/CategoryList";
import Pagination from "../../components/Pagination";
import RestaurantsList from "../../components/RestaurantsList";
import SearchBar from "../../components/SearchBar";

const CATEGORY_QUERY = gql`
  query category($categoryInput: CategoryInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    category(input: $categoryInput) {
      ok
      error
      totalPages
      totalItems
      restaurants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
`;

const CategoryPage = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        categoryInput: {
          page: page,
          slug: params.slug!,
        },
      },
    }
  );

  return (
    <>
      <Helmet>
        <title>{params.slug || "Search"} | SnapSnacks</title>
      </Helmet>
      <div className="pt-20">
        <SearchBar />
        {!loading && (
          <div className="mx-4 mb-16 sm:mx-16">
            <CategoryList data={data?.allCategories!} />
            {data?.category.totalItems !== 0 ? (
              <RestaurantsList data={data?.category!} />
            ) : (
              <span className="mt-12 flex justify-center text-3xl font-semibold">
                No restaurants found
              </span>
            )}
            {data?.category.error && (
              <span className="mt-12 flex justify-center text-3xl font-semibold">
                No restaurants found
              </span>
            )}
          </div>
        )}
      </div>
      <Pagination data={data?.category} page={page} setPage={setPage} />
    </>
  );
};

export default CategoryPage;
