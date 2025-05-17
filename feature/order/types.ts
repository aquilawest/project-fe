export type ICreateOrderModal = {
  products: [
    {
      productId: string;
      quantity: number;
      unitPrice: number;
    }
  ];
  supplier: string;
  deliveryAddress: string;
  paymentMethod: string;
  status: string;
  note: string;
};

export type IOrderDirectionBody = {
  origin: string;
  destination: string;
};
export type INearbyPlaceBody = {
  location: {
    lat: number;
    lng: number;
  };
  radius: number;
  type: string;
};
