"use client";
import Image from "next/image";
import { use } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useGetAllOrders } from "@/hooks/orders.hook";
import {
  useGetAllAdminOrdersQuery,
  useGetAllUsersQuery,
} from "@/hooks/admin.hook";
import { columns, columnsUsers } from "@/components/user/UserColumn";
export default function Dashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data, isLoading, error } = useGetAllOrders(
    user?.userType !== "admin"
  );
  const { data: allUsersData, isLoading: loadingUser } =
    useGetAllAdminOrdersQuery(user?.userType === "admin");

  if (isLoading || loadingUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Fetching your dashboard...</p>
      </div>
    );

  }
  // console.log(error?.response?.data?.error, "jjjjjjj");

  // if (error) {
  //   return <p>Failed to Fetch</p>;
  // }

  const buttonTitle =
    user?.userType === "consumer"
      ? "Place an order"
      : user?.userType === "supplier"
      ? "Add Product"
      : "";
  const route =
    user?.userType === "consumer"
      ? "/dashboard/product"
      : user?.userType === "supplier"
      ? "/dashboard/product/add-product"
      : "";
  const Data = user?.userType === "admin" ? allUsersData || [] : data || [];
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 ">
      <div className="container mx-auto py-10 px-4">
        <DataTable
          columns={columns}
          data={Data}
          buttonTitle={buttonTitle}
          route={route}
          title={"Your Orders"}
        />
      </div>
    </div>
  );
}
