export const ENDPOINT_URLS = {
  auth: {
    signup: "/auth/signup",
    login: "/auth/login",
    verify: "/auth/verify",
    "forgot-password": "/auth/forgotpassword",
    "resend-password": "/auth/resendverification",
    "reset-password": "/auth/resetpassword",
    "update-password": "/auth/updatepassword",
  },
  products: {
    "get-all": "/product/all-products",
    "create-product": "/product/create-product",
    "single-product": (productId: string) =>
      `/product/one-product/${productId}`,
    "delete-product": (productId: string) =>
      `/product/delete-product/${productId}`,

    "get-inventory": "/inventory/all-inventories",
    "create-inventory": "/inventory/add-inventory",
    "delete-inventory": (inventoryId: string) =>
      `/inventory/delete-inventory/${inventoryId}`,
  },
  order: {
    "get-all": "/order/all-orders",
    "create-order": "/order/create-order",
    "update-order": (orderId: string) => `/order/update-order/${orderId}`,
    "delete-order": (orderId: string) => `/order/delete-order/${orderId}`,
    "get-one-order": (orderId: string) => `/order/one-order/${orderId}`,
    "post-directions": "/order/directions",
    "get-nearbyPlaces": `/order/nearby-places`,
  },
  user: {
    "get-user": "/profile/get-profile",
    "update-user": "/profile/set-profile",
    "delete-user": "/profile/delete-profile",
  },
  admin: {
    "get-all-users": "/admin/get-users",
    "create-user": "/admin/create-user",
    "get-one-user": (userId: string) => `/admin/one-user/${userId}`,
    "update-user": (userId: string) => `/admin/update-user/${userId}`,
    "delete-user": (userId: string) => `/admin/delete-user/${userId}`,
    "get-all-orders": "/order/admin/all-orders",
    "get-all-products": "/product/admin/all-products",
  },
};
