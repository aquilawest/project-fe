export type IUser = {
  createdAt: string;
  email: string;
  firstname: string;
  gender: string;
  image: string;
  isActive: boolean;
  lastname: string;
  otp: { code: number; expiresAt: string };
  password: string;
  product: [];
  userType: string;
  _id: string;
};
