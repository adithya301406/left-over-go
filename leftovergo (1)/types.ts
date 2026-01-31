
export type UserRole = 'DONOR' | 'RECEIVER' | 'DELIVERY';

export interface User {
  id: string;
  phone: string;
  role: UserRole;
  name: string;
  location?: string;
}

export enum FoodStatus {
  AVAILABLE = 'AVAILABLE',
  CLAIMED = 'CLAIMED',
  PICKED_UP = 'PICKED_UP',
  DELIVERED = 'DELIVERED'
}

export interface FoodListing {
  id: string;
  title: string;
  donorId: string;
  donorName: string;
  donorPhone: string;
  description: string;
  quantity: string;
  expiryTime: string;
  pickupLocation: string;
  status: FoodStatus;
  receiverId?: string;
  receiverName?: string;
  receiverLocation?: string;
  deliveryPartnerId?: string;
  createdAt: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}
