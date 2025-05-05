"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Logo from "@/public/globe.svg";
import { useSearchParams } from "next/navigation";
import { useOneSingleProduct } from "@/hooks/products.hook";
import InputField from "@/components/ui/Input";
import { FiFileText } from "react-icons/fi";
import { useCreateOrderMutation } from "@/hooks/orders.hook";
import { ICreateOrderModal } from "@/feature/order/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function AddUserPage() {
  const [restaurantImage, setRestaurantImage] = useState(null);
  const [ownerNIDFile, setOwnerNIDFile] = useState({ name: "yournid.pdf" });
  const [businessLicenseFile, setBusinessLicenseFile] = useState(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");

  const {
    data: SingleProduct,
    isLoading,
    error,
  } = useOneSingleProduct(productId as string);
  const createOrderMutation = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateOrderModal>({
    defaultValues: {
      paymentMethod: "",
      deliveryAddress: "",
      note: "",
      products: [
        {
          productId: productId as string,
          quantity: 1,
          unitPrice: 250,
        },
      ],
      status: "pending",
      //   supplier: user?._id,
      //   quantity: 0,
      //   restaurantName: "",
      //   representativeName: "",
      //   phoneNumber: "",
      //   established: "",
      //   workingPeriod: "9:00 AM - 10:00 PM",
      //   largePayment: "Cash in hand",
      //   location: "",
    },
  });

  const workingPeriodOptions = [
    { value: "9:00 AM - 10:00 PM", label: "9:00 AM - 10:00 PM" },
    { value: "8:00 AM - 9:00 PM", label: "8:00 AM - 9:00 PM" },
    { value: "10:00 AM - 11:00 PM", label: "10:00 AM - 11:00 PM" },
    { value: "24 hours", label: "24 hours" },
  ];

  const paymentOptions = [
    { value: "Cash in hand", label: "Cash in hand" },
    { value: "Bank transfer", label: "Bank Transfer" },
    { value: "Credit card", label: "Credit card" },
    { value: "Mobile payment", label: "Mobile payment" },
  ];

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Unable to fetch product</p>;
  }

  const onSubmit = (data: ICreateOrderModal) => {
    createOrderMutation.mutate(data);
    console.log(data);
  };

  return (
    <div className={"py-20 container mx-auto px-4"}>
      <div className="  p-6 bg-white rounded-lg">
        <div className="mb-8">
          <h1 className="text-2xl  flex items-center text-gray-500 font-bold">
            <div className="w-1 h-8 bg-green-500 mr-3"></div>
            Product Details
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex flex-col gap-4 justify-center"}
        >
          {/* <Image
            src={Logo}
            alt={"P"}
            width={200}
            height={200}
            objectFit={"cover"}
            className={"self-center"}
          /> */}

          <div className={"text-center "}>
            <h2 className={"font-bold text-2xl"}>{SingleProduct?.name}</h2>
          </div>

          <div>
            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>Product name</p>
              <p className={"text-lg font-bold "}>{SingleProduct?.name}</p>
            </div>

            <hr />

            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>price</p>
              <p className={"text-lg font-bold "}>
                N {SingleProduct?.price.toLocaleString()}
              </p>
            </div>

            <hr />

            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>Description</p>
              <p className={"text-lg font-bold "}>
                {SingleProduct?.description}
              </p>
            </div>

            <hr />

            <div className={"text-start  mb-4 "}>
              <p className={"text-gray-400 text-md"}>Category</p>
              <p className={"text-lg font-bold "}>{SingleProduct?.category}</p>
            </div>

            <hr />

            <InputField
              isRequired
              type="select"
              label="Payment Method "
              placeholder="Select your Payment Method"
              register={register("paymentMethod", {
                required: "Payment Method is required",
              })}
              options={paymentOptions}
              errorMessage={errors.paymentMethod?.message as string}
            />
            <br />
            <hr />

            <InputField
              type="text"
              label="Delivery Address"
              isRequired={true}
              register={register("deliveryAddress", {
                required: "Category is required",
              })}
              errorMessage={errors.deliveryAddress?.message}
              startIcon={<FiFileText />}
              placeholder="Rice..."
            />
            <br />
            <hr />
            <InputField
              type="text"
              label="Note"
              isRequired={true}
              register={register("note", {
                required: "Note is required",
              })}
              errorMessage={errors.note?.message}
              startIcon={<FiFileText />}
              placeholder="Needed Urgently"
            />
            <br />
            <hr />
            <InputField
              type="number"
              label="Quantity"
              isRequired={true}
              //   value={control._defaultValues.products?.[0]?.quantity?.toLocaleString()}
              register={register("products.0.quantity", {
                required: "Quantity is required",
              })}
              errorMessage={errors?.products?.[0]?.quantity?.message}
              startIcon={<FiFileText />}
              placeholder="1"
            />
          </div>

          <Button
            // title={""}
            className={"bg-green-500 py-2 px-10 text-white mx-auto"}
          >
            {createOrderMutation.isPending ? "Ordering...." : "Make An Order"}
          </Button>
        </form>
      </div>
    </div>
  );
}
