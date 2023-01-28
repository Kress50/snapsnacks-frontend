import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOrder, getOrderVariables } from "../api/types/getOrder";
import { Button } from "../components/UI/Button";

const GET_ORDER = gql`
  query getOrder($getOrderInput: GetOrderInput!) {
    getOrder(input: $getOrderInput) {
      ok
      error
      order {
        id
        status
        total
        customer {
          email
        }
        driver {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

const Order = () => {
  const params = useParams();
  const { data, error } = useQuery<getOrder, getOrderVariables>(GET_ORDER, {
    variables: { getOrderInput: { id: +params.id! } },
  });
  const navigate = useNavigate();
  console.log(data);

  useEffect(() => {
    if (data?.getOrder.error || error) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [error, navigate, data?.getOrder.error]);

  return (
    <>
      {(error || data?.getOrder.error) && (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
          <span>
            The order you're trying to access either doesn't exist or you don't
            have the rights to see it
          </span>
          <span className="text-sm">
            Wait 5 seconds or click on the button to return to restaurants list:
          </span>
          <Button
            actionText="Return Back"
            canClick={true}
            loading={false}
            link={"/"}
          />
        </div>
      )}
      <div className="pt-20">{params.id}</div>
    </>
  );
};

export default Order;
