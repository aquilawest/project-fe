"use client";
import { Payment, columns } from "@/components/product/productColumn";
import { DataTable } from "@/components/ui/DataTable";
import { useGetAllAdminProductsQuery } from "@/hooks/admin.hook";
import { useGetAllInventory, useGetAllProducts } from "@/hooks/products.hook";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       productName: "pen",

//       status: "pending",
//     },

//     {
//       id: "728d52f",
//       amount: 100,
//       productName: "juice",

//       status: "pending",
//     },
//     {
//       id: "728ed2f",
//       amount: 100,
//       productName: "pencil",

//       status: "pending",
//     },
//     {
//       id: "728ed52",
//       amount: 100,
//       productName: "biro",
//       status: "pending",
//     },
//     {
//       id: "728e2f",
//       productName: "book",

//       amount: 100,
//       status: "pending",
//     },
//     {
//       id: "7282f",
//       productName: "bicycle",
//       amount: 100,
//       status: "pending",
//     },
//   ];
// }

export default function DemoPage() {
  // const data = await getData()
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: Products, isLoading } = useGetAllProducts(
    user?.userType !== "admin"
  );
  const { data: Inventories } = useGetAllInventory(user?.userType !== "admin");
  const { data: adminProducts } = useGetAllAdminProductsQuery(
    user?.userType === "admin"
  );

  console.log({ Inventories }, "inventory");

  if (isLoading) {
    return (
  <div className="flex flex-col items-center justify-center h-screen space-y-4">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-gray-600 text-sm">Fetching your products...</p>
  </div>
);

  const Data =
    user?.userType === "supplier"
      ? Inventories || []
      : user?.userType === "admin"
      ? adminProducts || []
      : Products || [];

  return (
    <div className="container mx-auto py-10 px-4">
      <DataTable
        columns={columns}
        data={Data}
        buttonTitle={
          user?.userType === "consumer" || user?.userType === "distrubor"
            ? ""
            : "Add product"
        }
        route={
          user?.userType === "consumer" || user?.userType === "distrubor"
            ? ""
            : "/dashboard/product/add-product"
        }
        title={"Products"}
      />
    </div>
  );
}
