import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CATEGORY_FRAGMENT } from "../../api/fragments";
import { addRestaurantCategories } from "../../api/types/addRestaurantCategories";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../api/types/createRestaurant";
import { Button } from "../../components/UI/Button";
import { FormError } from "../../components/UI/FormError";
import { MY_RESTAURANTS_QUERY } from "./MyRestaurants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($createRestaurantInput: CreateRestaurantInput!) {
    createRestaurant(input: $createRestaurantInput) {
      error
      ok
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query addRestaurantCategories {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
  }
  ${CATEGORY_FRAGMENT}
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const AddRestaurant = () => {
  const navigate = useNavigate();
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
      setFileSizeError(false);
      setCompleted(true);
      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else {
      console.log(error);
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [{ query: MY_RESTAURANTS_QUERY }],
  });

  const categoryData = useQuery<addRestaurantCategories>(CATEGORY_QUERY);
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>({ mode: "onChange" });
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
      const actualFile = file[0];
      if (actualFile.size > 1536000) {
        setFileSizeError(true);
        setUploading(false);
        return;
      }
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const request = await (
        await fetch(`${process.env.UPLOADS}`, {
          method: "POST",
          body: formBody,
        })
      ).json();
      await createRestaurantMutation({
        variables: {
          createRestaurantInput: {
            address,
            categoryName,
            name,
            coverImage: request.url,
          },
        },
      });
    } catch (e) {
      setUploading(false);
      setGenericUploadError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Restaurant | SnapSnacks</title>
      </Helmet>
      <div className="flex items-center justify-center px-4 pt-20 lg:h-screen lg:pt-0">
        <form
          className="flex w-full max-w-lg flex-col gap-8"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-col">
            <input
              className="input"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
              })}
              min="4"
              placeholder="Restaurant name"
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
              {...register("address", {
                required: "Address is required",
              })}
              placeholder="Restaurant address"
              type="text"
              required
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
              {...register("file", {
                required: "Image is required",
              })}
              accept="image/png, image/jpeg"
              required
            />
            {fileSizeError && <FormError errorMessage="File is too large!" />}
            <p className="pt-4 text-sm text-gray-500">
              Please attach a front cover image for your restaurant with in png
              or jpg format. File must be smaller than 1.5MB
            </p>
          </div>
          <Button
            actionText="Create Restaurant"
            loading={uploading}
            canClick={isValid && !completed}
          />
          {data?.createRestaurant.error && (
            <FormError errorMessage={data.createRestaurant.error} />
          )}
          {completed && (
            <h4 className="text-center font-semibold text-amber-500">
              Restaurant added successfully! Returning to restaurants list...
            </h4>
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

export default AddRestaurant;
