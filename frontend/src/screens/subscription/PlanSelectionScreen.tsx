import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSubscriptionFlow } from '../../stores/useSubscriptionFlow';

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
      <Text style={styles.title}>Select Number of Boxes</Text>
      {[1, 2, 3, 4].map((count) => (
        <Button
          key={count}
          title={`${count} box${count > 1 ? 'es' : ''} - $${count * 20}`}
          onPress={() => handleSelect(count, count * 20)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 20 },
});
