import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../api/fragments";
import { category, categoryVariables } from "../../api/types/category";

interface ICategoryParams {
  slug: string;
}

const CATEGORY_QUERY = gql`
  query category($categoryInput: CategoryInput!) {
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
  const { data, loading } = useQuery<category, categoryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        categoryInput: {
          page: 1,
          slug: params.slug!,
        },
      },
    }
  );
  console.log(data);
  return <div className="pt-20">CategoryPage</div>;
};

export default CategoryPage;
