"use client";
import {
  createOrderServices,
  deleteOrderServices,
  getAllOrdersServices,
  updateOrderServices,
} from "@/feature/order/orderServices";
import { ICreateOrderModal } from "@/feature/order/types";
import { _successPromt } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllOrders = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["useGetAllOrders"],
    queryFn: async () => {
      const data = await getAllOrdersServices();
      console.log(data, "getAllOrdersServices");
      return data;
    },
    enabled,
    retry: false,
  });
};

export const useCreateOrderMutation = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (values: ICreateOrderModal) => createOrderServices(values),
    onMutate: () => {
      console.log("Creating...");
    },
    onSuccess: (data, values) => {
      console.log(data, "data order");
      _successPromt("Order Created", 3000);

      router.push(`/dashboard`);
      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (productId: string) => deleteOrderServices(productId),
    onMutate: () => {
      console.log("Deleting....");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      _successPromt("Deleted Successfully", 3000);
      //   queryClient.invalidateQueries({
      //     queryKey: ["useGetAllAdminOrdersQuery", true],
      //   });
      window.location.reload();

      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: ({
      data,
      productId,
    }: {
      data: Partial<ICreateOrderModal>;
      productId: string;
    }) => updateOrderServices(data, productId),
    onMutate: () => {
      console.log("Updating....");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      window.location.reload();

      _successPromt("Updated Successfully", 3000);
      queryClient.invalidateQueries({
        queryKey: ["useGetAllAdminOrdersQuery", true],
      });
      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};
