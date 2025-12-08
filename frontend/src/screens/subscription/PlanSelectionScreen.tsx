
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';

const PLANS = [
  {
    count: 1,
    price: 490,
    label: '📦 Starter',
    desc: '1 Box – 490 Kč',
  },
  {
    count: 2,
    price: 890,
    label: '🌸 Standard',
    desc: '2 Boxes – 890 Kč (Save 10%)',
  },
  {
    count: 4,
    price: 1690,
    label: '💐 Family',
    desc: '4 Boxes – 1690 Kč',
  },
];

export default function PlanSelectionScreen({ navigation }: any) {
  const setBoxCount = useSubscriptionFlow((s) => s.setBoxCount);
  const setPlanPrice = useSubscriptionFlow((s) => s.setPlanPrice);

  const handleSelect = (count: number, price: number) => {
    setBoxCount(count);
    setPlanPrice(price);
    navigation.navigate('AddressInput');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Plan</Text>
      {PLANS.map((plan) => (
        <TouchableOpacity
          key={plan.count}
          style={styles.card}
          onPress={() => handleSelect(plan.count, plan.price)}
        >
          <Text style={styles.cardLabel}>{plan.label}</Text>
          <Text style={styles.cardDesc}>{plan.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 24, fontWeight: 'bold' },
  card: {
    backgroundColor: '#FF69B4',
    borderRadius: 12,
    padding: 24,
    marginBottom: 18,
    width: 320,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLabel: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  cardDesc: { fontSize: 16, color: '#fff' },
});
