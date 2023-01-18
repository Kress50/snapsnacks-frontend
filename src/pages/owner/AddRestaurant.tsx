import { gql, useMutation, useQuery } from "@apollo/client";
import { add } from "cypress/types/lodash";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { CATEGORY_FRAGMENT } from "../../api/fragments";
import { addRestaurantCategories } from "../../api/types/addRestaurantCategories";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../api/types/createRestaurant";
import { Button } from "../../components/UI/Button";
import { FormError } from "../../components/UI/FormError";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($createRestaurantInput: CreateRestaurantInput!) {
    createRestaurant(input: $createRestaurantInput) {
      error
      ok
    }
  }
`;

const CATEGORY_QUERY = gql`
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
  const onCompleted = (data: createRestaurant) => {
    const {
      createRestaurant: { ok, error },
    } = data;
    if (ok) {
      setUploading(false);
    } else {
      console.log(error);
    }
  };

  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, { onCompleted });

  const categoryData = useQuery<addRestaurantCategories>(CATEGORY_QUERY);
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormProps>();
  const [uploading, setUploading] = useState(false);

  const onSubmitHandler = async () => {
    try {
      setUploading(true);
      const { file, name, address, categoryName } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const request = await (
        await fetch("http://localhost:4000/uploads/", {
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
      console.log(e);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Restaurant | SnapSnacks</title>
      </Helmet>
      <div className="flex h-screen items-center justify-center px-4">
        <form
          className="flex w-full max-w-lg flex-col gap-8"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <input
            className="input"
            {...register("name", {
              required: "Name is required",
              minLength: 3,
            })}
            placeholder="Restaurant name"
            type="text"
            required
          />
          <input
            className="input"
            {...register("address", {
              required: "Address is required",
            })}
            placeholder="Restaurant address"
            type="text"
            required
          />
          <select
            className="input"
            {...register("categoryName", {
              required: "Category is required",
            })}
            required
          >
            {categoryData.data?.allCategories.categories?.map((category) => (
              <option key={category.slug}>{category.name}</option>
            ))}
          </select>
          <div className="input">
            <input
              type="file"
              {...register("file", {
                required: "Image is required",
              })}
              accept="image/*"
              required
            />
          </div>
          <Button
            actionText="Create Restaurant"
            loading={uploading}
            canClick={isValid}
          />
          {data?.createRestaurant.error && (
            <FormError errorMessage={data.createRestaurant.error} />
          )}
        </form>
      </div>
    </>
  );
};

export default AddRestaurant;
