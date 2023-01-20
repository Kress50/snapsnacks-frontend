import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addRestaurantCategories } from "../../api/types/addRestaurantCategories";
import {
  editRestaurant,
  editRestaurantVariables,
} from "../../api/types/editRestaurant";
import { Button } from "../../components/UI/Button";
import { FormError } from "../../components/UI/FormError";
import { useCheckOwnership } from "../../hooks/useCheckOwnership";
import { CATEGORY_QUERY } from "./AddRestaurant";
import { MY_RESTAURANT_QUERY } from "./MyRestaurant";

const EDIT_RESTAURANT_MUTATION = gql`
  mutation editRestaurant($editRestaurantInput: EditRestaurantInput!) {
    editRestaurant(input: $editRestaurantInput) {
      error
      ok
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const EditRestaurant = () => {
  const { restaurantId } = useParams();
  const restaurantData = useCheckOwnership(restaurantId!);
  const navigate = useNavigate();

  const onCompleted = (data: editRestaurant) => {
    const {
      editRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
      setFileSizeError(false);
      setCompleted(true);
      navigate(`/restaurant/${restaurantId}/`);
    } else {
      console.log(error);
    }
  };

  const categoryData = useQuery<addRestaurantCategories>(CATEGORY_QUERY);
  const [editRestaurantMutation, { data }] = useMutation<
    editRestaurant,
    editRestaurantVariables
  >(EDIT_RESTAURANT_MUTATION, {
    onCompleted,
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
  } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      name: restaurantData?.myRestaurant.restaurant.name,
      address: restaurantData?.myRestaurant.restaurant.address,
    },
  });
  const [uploading, setUploading] = useState(false);
  const [genericUploadError, setGenericUploadError] = useState(false);
  const [fileSizeError, setFileSizeError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setUploading(true);
      setGenericUploadError(false);
      setFileSizeError(false);
      const { file, name, address, categoryName } = getValues();
      let request = restaurantData?.myRestaurant.restaurant.coverImage;
      if (file.length > 0) {
        const actualFile = file[0];
        if (actualFile.size > 1536000) {
          setFileSizeError(true);
          setUploading(false);
          return;
        }
        const formBody = new FormData();
        formBody.append("file", actualFile);
        request = await (
          await fetch("http://localhost:4000/uploads/", {
            method: "POST",
            body: formBody,
          })
        ).json();
      }
      await editRestaurantMutation({
        variables: {
          editRestaurantInput: {
            address,
            categoryName,
            name,
            coverImage: request.url,
            restaurantId: +restaurantId!,
          },
        },
      });
    } catch (e) {
      setUploading(false);
      setGenericUploadError(true);
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Restaurant | SnapSnacks</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center gap-8 px-4 pt-20 lg:h-screen lg:pt-0">
        <h2 className="text-center text-xl font-semibold">Edit Restaurant</h2>
        <form
          className="flex w-full max-w-lg flex-col gap-8"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-col">
            <input
              className="input"
              {...register("name", {
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
              })}
              min="4"
              placeholder="Restaurant name"
              type="text"
            />
            {errors.name?.message && (
              <FormError errorMessage={errors.name.message} />
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="input"
              {...register("address", {
                minLength: {
                  value: 10,
                  message: "Address can't be empty!",
                },
              })}
              min="1"
              placeholder="Restaurant address"
              type="text"
            />
            {errors.address?.message && (
              <FormError errorMessage={errors.address.message} />
            )}
          </div>
          <div className="flex flex-col">
            <select
              className="input"
              defaultValue={"sandwiches"}
              {...register("categoryName")}
            >
              {categoryData.data?.allCategories.categories?.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <input
              type="file"
              {...register("file")}
              accept="image/png, image/jpeg"
            />
            {fileSizeError && <FormError errorMessage="File is too large!" />}
            <p className="pt-4 text-sm text-gray-500">
              Please attach a front cover image for your restaurant with in png
              or jpg format. File must be smaller than 1.5MB
            </p>
          </div>
          <Button
            actionText="Edit Restaurant"
            loading={uploading}
            canClick={isValid && !completed}
          />
          {data?.editRestaurant.error && (
            <FormError errorMessage={data.editRestaurant.error} />
          )}
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

export default EditRestaurant;
