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
