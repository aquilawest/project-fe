"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown, Loader } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import { IUser } from "@/model/user.model";
import { useOneSingleProduct } from "@/hooks/products.hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDeleteUserMutation } from "@/hooks/admin.hook";
import {
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "@/hooks/orders.hook";

export type User = {
  _id: string;
  name: string;
  email: string;
  status: string;
  _orderedBy: IUser;
  products: {
    productId: string;
    quantity: string;
    unitPrice: string;
    _id: string;
  }[];
};

export const columns: ColumnDef<User, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      console.log({ order });
      const { data: product } = useOneSingleProduct(
        order?.products?.[0]?.productId
      );
      return (
        <Link
          href={`/dashboard/map-view?q=${product?.name}`}
          className="relative"
        >
          <p>{product?.name}</p>
        </Link>
      );
    },
  },

  {
    accessorKey: "Quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      const { data: product } = useOneSingleProduct(
        order?.products?.[0]?.productId
      );
      // console.log({ order });
      return (
        <Link
          href={`/dashboard/map-view?q=${product?.name}`}
          className="relative"
        >
          <p>{order?.products?.[0]?.quantity}</p>
        </Link>
      );
    },
  },

  {
    accessorKey: "Status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          //   onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
        </Button>
      );
    },
    cell: ({ row }) => {
      const order = row.original;
      console.log({ order });
      const { data: product } = useOneSingleProduct(
        order?.products?.[0]?.productId
      );
      return (
        <Link
          href={`/dashboard/map-view?q=${product?.name}`}
          className="relative"
        >
          <p>{order?.status}</p>
        </Link>
      );
    },
  },

  //   {
  //     accessorKey: "email",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           Email
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //   },

  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const { user } = useSelector((state: RootState) => state.auth);
      const deleteOrderMutation = useDeleteOrderMutation();

      const updateOrderMutation = useUpdateOrderMutation();

      return (
        <div className="relative">
          {deleteOrderMutation.isPending || updateOrderMutation.isPending ? (
            <Loader />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  {/* <Link href="/dashboard/view-user">View</Link> */}
                </DropdownMenuItem>
                {user?.userType === "consumer" ? null : (
                  <>
                    <DropdownMenuItem>
                      <button
                        onClick={() =>
                          updateOrderMutation.mutate({
                            productId: order?._id,
                            data: {
                              status: "approved",
                            },
                          })
                        }
                      >
                        Approve
                      </button>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <button
                        onClick={() =>
                          updateOrderMutation.mutate({
                            productId: order?._id,
                            data: {
                              status: "declined",
                            },
                          })
                        }
                      >
                        Decline
                      </button>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem>
                  <button
                    onClick={() => deleteOrderMutation.mutate(order?._id)}
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];

export const columnsUsers: ColumnDef<IUser, unknown>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="relative">
          <p>
            {user?.firstname} {user?.lastname}
          </p>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return <Button variant="ghost">Email</Button>;
    },
  },

  {
    accessorKey: "userType",
    header: ({ column }) => {
      return <Button variant="ghost">User Type</Button>;
    },
  },

  {
    accessorKey: "gender",
    header: ({ column }) => {
      return <Button variant="ghost">Gender</Button>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const userRow = row.original;
      const deletedUserAdminMutation = useDeleteUserMutation();
      //   const { user } = useSelector((state: RootState) => state.auth);

      return (
        <div className="relative">
          {deletedUserAdminMutation.isPending ? (
            <Loader />
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={`/dashboard/view-user?userId=${userRow?._id}`}>
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link href={`/dashboard/edit-user?userId=${userRow?._id}`}>
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => deletedUserAdminMutation.mutate(userRow._id)}
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
  },
];
