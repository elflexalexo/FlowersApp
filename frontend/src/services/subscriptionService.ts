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

export const getSubscriptions = async (token: string) => {
  const res = await axios.get(`${API_URL}/subscriptions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
