import axiosInstance from "@/utils/api";
import { ENDPOINT_URLS } from "@/utils/endpoints";
import {
  ICreateOrderModal,
  INearbyPlaceBody,
  IOrderDirectionBody,
} from "./types";

// Get All Services
export const getAllOrdersServices = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(ENDPOINT_URLS.order["get-all"]);
  return response.data || response;
};

// Get All Services
export const createOrderServices = async (
  data: ICreateOrderModal
): Promise<any> => {
  const response = await axiosInstance.post<any>(
    ENDPOINT_URLS.order["create-order"],
    data
  );
  return response.data || response;
};

// Get All Services
export const getOneOrdersServices = async (orderId: string): Promise<any> => {
  const response = await axiosInstance.get<any>(
    ENDPOINT_URLS.order["get-one-order"](orderId)
  );
  return response.data || response;
};

// Get All Services
export const updateOrderServices = async (
  data: Partial<ICreateOrderModal>,
  orderId: string
): Promise<any> => {
  const response = await axiosInstance.patch<any>(
    ENDPOINT_URLS.order["update-order"](orderId),
    data
  );
  return response.data || response;
};

// Get All Services
export const deleteOrderServices = async (orderId: string): Promise<any> => {
  const response = await axiosInstance.delete<any>(
    ENDPOINT_URLS.order["delete-order"](orderId)
  );
  return response.data || response;
};

// Get All Services
export const postUserDirections = async (
  body: IOrderDirectionBody
): Promise<any> => {
  const response = await axiosInstance.post<any>(
    ENDPOINT_URLS.order["post-directions"],
    body
  );
  return response.data || response;
};
// Get All Services
export const getNearbyPlaces = async (body: INearbyPlaceBody): Promise<any> => {
  const response = await axiosInstance.post<any>(
    ENDPOINT_URLS.order["get-nearbyPlaces"],
    body
  );
  return response.data || response;
};
