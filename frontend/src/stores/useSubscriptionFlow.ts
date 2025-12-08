import { create } from 'zustand';

interface Address {
  street: string;
  city: string;
  zip: string;
  note?: string;
}

interface SubscriptionFlowState {
  boxCount: number;
  planPrice: number;
  address: Address;
  deliveryDay: 'Wednesday' | 'Friday' | null;
  setBoxCount: (count: number) => void;
  setPlanPrice: (price: number) => void;
  setAddress: (address: Address) => void;
  setDeliveryDay: (day: 'Wednesday' | 'Friday') => void;
  reset: () => void;
}

export const useSubscriptionFlow = create<SubscriptionFlowState>((set) => ({
  boxCount: 0,
  planPrice: 0,
  address: { street: '', city: '', zip: '', note: '' },
  deliveryDay: null,
  setBoxCount: (boxCount) => set({ boxCount }),
  setPlanPrice: (planPrice) => set({ planPrice }),
  setAddress: (address) => set({ address }),
  setDeliveryDay: (deliveryDay) => set({ deliveryDay }),
  reset: () => set({
    boxCount: 0,
    planPrice: 0,
    address: { street: '', city: '', zip: '', note: '' },
    deliveryDay: null,
  }),
}));