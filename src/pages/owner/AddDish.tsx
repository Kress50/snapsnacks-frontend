import { gql, useMutation } from "@apollo/client";
import { faCircleXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createDish, createDishVariables } from "../../api/types/createDish";
import { Button } from "../../components/UI/Button";
import { FormError } from "../../components/UI/FormError";
import { MY_RESTAURANT_QUERY } from "./MyRestaurant";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($createDishInput: CreateDishInput!) {
    createDish(input: $createDishInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

const AddDish = () => {
  const { restaurantId } = useParams();
  const [createDishMutation, { loading }] = useMutation<
    createDish,
    createDishVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: { myRestaurantInput: { id: +restaurantId! } },
      },
    ],
  });
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
  } = useForm<IFormProps>({ mode: "onChange" });
  const [genericUploadError, setGenericUploadError] = useState(false);
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const navigate = useNavigate();

  const onSubmitHandler = async () => {
    try {
      setGenericUploadError(false);
      const { name, price, description, ...rest } = getValues();
      const optionsObjects = optionsNumber.map((id) => ({
        name: rest[`${id}-optionName`],
        extra: +rest[`${id}-optionExtra`],
      }));
      await createDishMutation({
        variables: {
          createDishInput: {
            name,
            price: +price,
            description,
            restaurantId: +restaurantId!,
            options: optionsObjects,
          },
        },
      });
      navigate(`/restaurant/${restaurantId}`);
    } catch (e) {
      setGenericUploadError(true);
      console.log(e);
    }
  };

  const onAddOptionsHandler = () => {
    setOptionsNumber((prev) => [Date.now(), ...prev]);
  };

  const onDeleteOptionHandler = (optionId: number) => {
    setOptionsNumber((prev) => prev.filter((id) => id !== optionId));
    setValue(`${optionId}-optionName`, "");
    setValue(`${optionId}-optionExtra`, "");
  };

  return (
    <>
      <Helmet>
        <title>Add dish | SnapSnacks</title>
      </Helmet>
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-center text-xl font-semibold">Add Dish</h2>
        <form
          className="flex w-full max-w-lg flex-col gap-8"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-col">
            <input
              className="input"
              {...register("name", {
                required: "Name is required",
              })}
              placeholder="Name"
              type="text"
              required
            />
            {errors.name?.message && (
              <FormError errorMessage={errors.name.message} />
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="input"
              {...register("price", {
                required: "Price is required",
              })}
              placeholder="Price (in USD)"
              type="number"
              min={0}
              step="0.01"
              required
            />
            {errors.price?.message && (
              <FormError errorMessage={errors.price.message} />
            )}
          </div>
          <div className="flex flex-col">
            <textarea
              className="input-textbox"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  message: "Description must be at least 5 characters long",
                  value: 5,
                },
                maxLength: {
                  message:
                    "Description must be no longer than 140 characters long",
                  value: 140,
                },
              })}
              placeholder="Description"
              minLength={5}
              maxLength={140}
              required
            />
            {errors.description?.message && (
              <FormError errorMessage={errors.description.message} />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-medium">Dish options</h4>
            <span
              className="w-fit cursor-pointer rounded-md bg-amber-500 py-1 px-2 text-sm text-white shadow-md hover:bg-orange-400 active:bg-amber-500"
              onClick={onAddOptionsHandler}
            >
              Add dish option
            </span>
            {optionsNumber.length !== 0 &&
              optionsNumber.map((id) => (
                <div
                  key={id}
                  className="mt-2 flex flex-col items-start justify-start gap-2 sm:flex-row sm:items-center sm:gap-1"
                >
                  <input
                    {...register(`${id}-optionName`)}
                    required
                    type="text"
                    className="input"
                    placeholder="Option name"
                  />
                  <input
                    {...register(`${id}-optionExtra`)}
                    className="input"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Option price (optional)"
                  />
                  <div className="flex">
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => onDeleteOptionHandler(id)}
                      className="cursor-pointer p-2 text-2xl text-gray-400 hover:text-red-500  active:scale-95 active:text-red-600"
                    />
                  </div>
                </div>
              ))}
          </div>
          <Button actionText="Add Dish" loading={loading} canClick={isValid} />
          {genericUploadError && (
            <h4 className="text-center font-semibold text-red-500">
              Something went wrong... Try again.
            </h4>
          )}
        </form>
      </div>
    </>
  );
};

export default AddDish;
