"use client";
import {
  createInventoryServices,
  createProductServices,
  deleteInventoryServices,
  deleteProductServices,
  getAllInventory,
  getAllProductServices,
  getOneProductServices,
} from "@/feature/products/productsServices";
import { ICreateInventory, ICreateProduct } from "@/feature/products/type";
import { _successPromt } from "@/utils/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetAllProducts = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllProducts"],
    queryFn: async () => {
      const data = await getAllProductServices();
      console.log(data, "getAllProductServices");
      return data;
    },
    enabled,
    retry: false,
  });
};

export const useCreateInventoryMutation = () => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (values: ICreateInventory) => createInventoryServices(values),
    onMutate: () => {
      console.log("Creating...");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      _successPromt("Product Created", 3000);

      router.push(`/dashboard/product`);
      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useCreateProductMutation = (
  location?: string,
  quantity?: string
) => {
  // const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  const createInventory = useCreateInventoryMutation().mutateAsync;
  return useMutation({
    mutationFn: (values: ICreateProduct) => createProductServices(values),
    onMutate: () => {
      console.log("Creating...");
    },
    onSuccess: async (data, values) => {
      console.log(data, "data product upppppppp");
      if (data && data._id && location && quantity) {
        try {
          await createInventory({
            _product: data._id,
            location,
            quantity,
          });
        } catch (inventoryError) {
          console.error("Inventory creation failed", inventoryError);
          return; // stop further actions if inventory fails
        }
      }

      _successPromt("Product Created", 3000);
      router.push(`/dashboard/product`);
      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useOneSingleProduct = (productId: string) => {
  return useQuery({
    queryKey: ["useOneSingleProduct", productId],
    queryFn: async () => {
      const data = await getOneProductServices(productId);
      console.log(data, "getOneProductServices");
      return data;
    },
    enabled: !!productId,
    retry: false,
  });
};

export const useGetAllInventory = (enabled: boolean = false) => {
  return useQuery({
    queryKey: ["useGetAllInventory"],
    queryFn: async () => {
      const data = await getAllInventory();
      console.log(data, "getAllInventory");
      return data;
    },
    enabled,
    retry: false,
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (productId: string) => deleteProductServices(productId),
    onMutate: () => {
      console.log("Deleting....");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      _successPromt("Deleted Successfully", 3000);
      queryClient.invalidateQueries({
        queryKey: ["useGetAllInventory"],
      });
      //   router.push(`/dashboard/product`);
      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};

export const useDeleteInventoryMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (productId: string) => deleteInventoryServices(productId),
    onMutate: () => {
      console.log("Deleting....");
    },
    onSuccess: (data, values) => {
      console.log(data, "data product upppppppp");
      _successPromt("Deleted Successfully", 3000);
      queryClient.invalidateQueries({
        queryKey: ["useGetAllInventory"],
      });
      //   router.push(`/dashboard/product`);
      // dispatch(setUser(user));
      // dispatch(setAuthentication());
      // queryClient.setQueryData(["user"], data);
    },
    onError: (error: any) => {
      console.log(error.response?.data?.error || error.message);
    },
  });
};
