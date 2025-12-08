import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const createSubscription = async (payload: any, token: string) => {
  const res = await axios.post(`${API_URL}/subscriptions`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
