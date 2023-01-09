import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PaginationButton from "./UI/PaginationButton";

interface IPaginationProps {
  data: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<IPaginationProps> = ({ data, page, setPage }) => {
  function nextPageHandler() {
    setPage((prev: number) => prev + 1);
  }
  function prevPageHandler() {
    setPage((prev: number) => prev - 1);
  }

  return (
    <>
      {data?.totalPages > 1 && (
        <div className="my-10 mx-auto grid max-w-md grid-cols-3 place-items-center">
          {page === data?.totalPages ? (
            <PaginationButton func={prevPageHandler} arrow={faArrowLeft} />
          ) : (
            <div></div>
          )}
          <span className="select-none text-lg font-semibold">
            Page {page} of {data?.totalPages}
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

export default Pagination;
