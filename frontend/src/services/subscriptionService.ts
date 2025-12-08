export const cancelSubscription = async (id: number, token: string) => {
  const res = await axios.delete(`${API_URL}/subscriptions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const pauseOrSkipSubscription = async (id: number, nextDelivery: string, token: string) => {
  const res = await axios.patch(
    `${API_URL}/subscriptions/${id}/pause`,
    { nextDelivery },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
export const updateSubscription = async (id: number, payload: any, token: string) => {
  const res = await axios.put(`${API_URL}/subscriptions/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
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
