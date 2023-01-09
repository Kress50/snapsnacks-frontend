import { Link } from "react-router-dom";
import { restaurantsPageQuery } from "../api/types/restaurantsPageQuery";
import Category from "./UI/Category";

interface ICategoryListProps {
  data?: restaurantsPageQuery;
}

const CategoryList: React.FC<ICategoryListProps> = ({ data }) => {
  return (
    <div className="my-4 mx-auto flex flex-wrap items-baseline justify-center gap-12">
      {data?.allCategories.categories?.map((category) => (
        <Link key={category.name} to={`/category/${category.slug}`}>
          <Category image={category.coverImage} name={category.name} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
