import { create } from 'zustand';

interface Address {
  street: string;
  city: string;
  zip: string;
  note?: string;
}

interface DeliveryTime {
  from: string;
  to: string;
}

interface SubscriptionFlowState {
  recipientName: string;
  phone: string;
  boxCount: number;
  planPrice: number;
  address: Address;
  deliveryDays: string[];
  deliveryTime: DeliveryTime;
  setRecipientName: (name: string) => void;
  setPhone: (phone: string) => void;
  setBoxCount: (count: number) => void;
  setPlanPrice: (price: number) => void;
  setAddress: (address: Address) => void;
  setDeliveryDays: (days: string[]) => void;
  setDeliveryTime: (time: DeliveryTime) => void;
  reset: () => void;
}

export const useSubscriptionFlow = create<SubscriptionFlowState>((set) => ({
  recipientName: '',
  phone: '',
  boxCount: 0,
  planPrice: 0,
  address: { street: '', city: '', zip: '', note: '' },
  deliveryDays: [],
  deliveryTime: { from: '09:00', to: '18:00' },
  setRecipientName: (recipientName) => set({ recipientName }),
  setPhone: (phone) => set({ phone }),
  setBoxCount: (boxCount) => set({ boxCount }),
  setPlanPrice: (planPrice) => set({ planPrice }),
  setAddress: (address) => set({ address }),
  setDeliveryDays: (deliveryDays) => set({ deliveryDays }),
  setDeliveryTime: (deliveryTime) => set({ deliveryTime }),
  reset: () => set({
    recipientName: '',
    phone: '',
    boxCount: 0,
    planPrice: 0,
    address: { street: '', city: '', zip: '', note: '' },
    deliveryDays: [],
    deliveryTime: { from: '09:00', to: '18:00' },
  }),
}));