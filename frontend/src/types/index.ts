// Type definitions for the app
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  SubscriptionsList: undefined;
  SubscriptionDetail: { id: string };
  SubscriptionWizard: undefined;
  Profile: undefined;
  EditAddress: { addressId?: string };
};

export type RootStackParamList = AuthStackParamList & AppStackParamList;

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  recipientName: string;
  recipientPhone: string;
  street: string;
  city: string;
  postalCode: string;
  notes?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  category: 'small' | 'medium' | 'large';
  frequency: 'weekly' | 'biweekly' | 'monthly';
  status: 'active' | 'paused' | 'cancelled';
  nextDelivery: string;
  addressId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}
