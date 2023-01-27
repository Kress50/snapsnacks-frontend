import { Link } from "react-router-dom";
import { restaurantsPageQuery_allCategories } from "../api/types/restaurantsPageQuery";
import Category from "./UI/Category";

interface ICategoryListProps {
  data: restaurantsPageQuery_allCategories;
}

const CategoryList: React.FC<ICategoryListProps> = ({ data }) => {
  return (
    <div className="my-8 mx-auto flex flex-wrap items-center justify-center gap-12">
      {data?.categories?.map((category) => (
        <Link key={category.name} to={`/category/${category.slug}`}>
          <Category image={category.coverImage} name={category.name} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
