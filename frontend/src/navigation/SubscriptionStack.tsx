import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanSelectionScreen from '../screens/subscription/PlanSelectionScreen';
import AddressInputScreen from '../screens/subscription/AddressInputScreen';
import DeliveryWindowScreen from '../screens/subscription/DeliveryWindowScreen';
import SummaryScreen from '../screens/subscription/SummaryScreen';

const Stack = createNativeStackNavigator();

export default function SubscriptionStack() {
  return (
    <Stack.Navigator initialRouteName="PlanSelection">
      <Stack.Screen name="PlanSelection" component={PlanSelectionScreen} options={{ title: 'Select Plan' }} />
      <Stack.Screen name="AddressInput" component={AddressInputScreen} options={{ title: 'Enter Address' }} />
      <Stack.Screen name="DeliveryWindow" component={DeliveryWindowScreen} options={{ title: 'Delivery Window' }} />
      <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Summary' }} />
    </Stack.Navigator>
  );
}
