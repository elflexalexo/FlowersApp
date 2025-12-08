import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';
import { updateSubscription } from '../services/subscriptionService';

// Props: subscription (object), onSave (function), navigation
export default function EditSubscriptionScreen({ route, navigation }: any) {
  const { subscription } = route.params;
  const [boxCount, setBoxCount] = useState(subscription.boxCount);
  const [recipientName, setRecipientName] = useState(subscription.recipientName || '');
  const [phone, setPhone] = useState(subscription.phone || '');
  const [street, setStreet] = useState(subscription.address.street || '');
  const [zip, setZip] = useState(subscription.address.zip || '');
  const [note, setNote] = useState(subscription.address.note || '');
  const [deliveryDays, setDeliveryDays] = useState(subscription.deliveryDays || []);
  const [deliveryTime, setDeliveryTime] = useState(subscription.deliveryTime || { from: '', to: '' });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const token = useAuthStore((s) => s.token) ?? '';

  const validate = () => {
    const newErrors: any = {};
    if (!recipientName.trim()) newErrors.recipientName = 'Full name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone is required.';
    else if (!/^\d{9,15}$/.test(phone.trim())) newErrors.phone = 'Phone must be 9–15 digits.';
    if (!street.trim()) newErrors.street = 'Street is required.';
    if (!zip.trim()) newErrors.zip = 'ZIP is required.';
    else if (!/^\d{5}$/.test(zip.trim())) newErrors.zip = 'ZIP must be exactly 5 digits.';
    if (!boxCount || boxCount < 1 || boxCount > 4) newErrors.boxCount = 'Box count must be 1–4.';
    // Delivery time format validation
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (deliveryTime.from && !timeRegex.test(deliveryTime.from)) newErrors.deliveryTimeFrom = 'Time must be HH:MM.';
    if (deliveryTime.to && !timeRegex.test(deliveryTime.to)) newErrors.deliveryTimeTo = 'Time must be HH:MM.';
    return newErrors;
  };

  const handleSave = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    setApiError('');
    setSuccess(false);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    try {
      await updateSubscription(subscription.id, {
        boxCount,
        recipientName,
        phone,
        address: { street, city: subscription.address.city, zip, note },
        deliveryDays,
        deliveryTime,
        planPrice: subscription.planPrice,
      }, token);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigation.navigate('SubscriptionsList');
      }, 1200);
    } catch (err: any) {
      setLoading(false);
      const errorMsg = err?.response?.data?.message;
      setApiError(typeof errorMsg === 'string' ? errorMsg : 'Failed to update subscription');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Subscription</Text>
      {loading && <ActivityIndicator size="large" color="#ff6b9d" style={{ marginBottom: 12 }} />}
      {apiError && <Text style={{ color: '#d00', marginBottom: 10 }}>{apiError}</Text>}
      {success && <Text style={{ color: '#0a0', marginBottom: 10 }}>Subscription updated!</Text>}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={recipientName}
        onChangeText={setRecipientName}
      />
      {errors.recipientName && <Text style={styles.error}>{errors.recipientName}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        maxLength={15}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Street"
        value={street}
        onChangeText={setStreet}
      />
      {errors.street && <Text style={styles.error}>{errors.street}</Text>}
      <TextInput
        style={styles.input}
        placeholder="ZIP Code"
        value={zip}
        onChangeText={v => {
          // Only allow digits
          if (/^\d*$/.test(v)) setZip(v);
        }}
        keyboardType="numeric"
        maxLength={5}
      />
      {errors.zip && <Text style={styles.error}>{errors.zip}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
      />
      <TextInput
        style={styles.input}
        placeholder="Box Count (1–4)"
        value={String(boxCount)}
        onChangeText={v => {
          // Only allow 1-4
          if (/^[1-4]$/.test(v)) setBoxCount(Number(v));
          else if (v === '') setBoxCount(1);
        }}
        keyboardType="numeric"
        maxLength={1}
      />
      {errors.boxCount && <Text style={styles.error}>{errors.boxCount}</Text>}
      <Text style={{ fontWeight: 'bold', marginTop: 10, marginBottom: 4 }}>Delivery Days</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, width: '80%' }}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <View key={day} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 12, marginBottom: 6 }}>
            <Button
              title={deliveryDays.includes(day) ? '✔' : ''}
              onPress={() => {
                setDeliveryDays(deliveryDays.includes(day)
                  ? deliveryDays.filter((d: string) => d !== day)
                  : [...deliveryDays, day]);
              }}
              color={deliveryDays.includes(day) ? '#ff6b9d' : '#ccc'}
            />
            <Text style={{ marginLeft: 4 }}>{day}</Text>
          </View>
        ))}
      </View>
      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Delivery Time</Text>
      <View style={{ flexDirection: 'row', width: '80%', marginBottom: 10 }}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 8 }]}
          placeholder="From (e.g. 09:00)"
          value={deliveryTime.from}
          onChangeText={v => setDeliveryTime({ ...deliveryTime, from: v })}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="To (e.g. 17:00)"
          value={deliveryTime.to}
          onChangeText={v => setDeliveryTime({ ...deliveryTime, to: v })}
        />
      </View>
      {errors.deliveryTimeFrom && <Text style={styles.error}>{errors.deliveryTimeFrom}</Text>}
      {errors.deliveryTimeTo && <Text style={styles.error}>{errors.deliveryTimeTo}</Text>}
      <Button title="Save Changes" onPress={handleSave} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  error: {
    color: '#d00',
    fontSize: 13,
    marginBottom: 6,
    alignSelf: 'flex-start',
    width: '80%',
  },
});
