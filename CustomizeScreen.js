import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SIZES, SUGAR_LEVELS } from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import ItemImage from './ItemImage';

export default function CustomizeScreen({ drink, onDone, onAddedToCart }) {
  const [size, setSize] = useState('Small');
  const [sugar, setSugar] = useState('50%');
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  const price = drink.prices[size];
  const total = price * qty;

  const handleAdd = () => {
    addToCart(drink, size, sugar, qty);
    (onAddedToCart || onDone)();
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onDone}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Customize Drink</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.imageBox}>
          <ItemImage id={drink.id} size={70} radius={14} resizeMode="cover" />
        </View>

        <Text style={styles.bigName}>{drink.name}</Text>
        <Text style={styles.bigPrice}>₱{price}</Text>

        <Text style={styles.label}>Size</Text>
        <View style={styles.row}>
          {SIZES.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setSize(s)}
              style={[styles.sizeOption, size === s && styles.activeBg]}
            >
              <Text style={[styles.optionText, size === s && styles.whiteText]}>{s}</Text>
              <Text style={[styles.subText, size === s && styles.whiteText]}>₱{drink.prices[s]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Sugar Level</Text>
        <View style={styles.row}>
          {SUGAR_LEVELS.map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => setSugar(level)}
              style={[styles.sugarOption, sugar === level && styles.activeBg]}
            >
              <Text style={[styles.sugarText, sugar === level && styles.whiteText]}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Quantity</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
            <Ionicons name="remove" size={18} color="#333" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => setQty(qty + 1)}>
            <Ionicons name="add" size={18} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomBar}>
          <View>
            <Text style={{ color: '#666', fontSize: 12 }}>Total Price</Text>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>₱{total}</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <Ionicons name="cart" size={16} color="#fff" />
            <Text style={styles.addText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 18, fontWeight: '700' },
  content: { padding: 16 },
  imageBox: { width: '100%', aspectRatio: 11 / 9, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 12, backgroundColor: '#FFF8F0', overflow: 'hidden' },
  bigName: { fontSize: 22, fontWeight: '700' },
  bigPrice: { fontSize: 18, color: '#8B4513', fontWeight: '700', marginBottom: 10 },
  label: { fontWeight: '700', marginTop: 20, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  sizeOption: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, alignItems: 'center', paddingVertical: 10 },
  sugarOption: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20, alignItems: 'center', paddingVertical: 10 },
  activeBg: { backgroundColor: '#8B4513', borderColor: '#8B4513' },
  optionText: { color: '#333', fontWeight: '600' },
  sugarText: { color: '#333', fontWeight: '600', fontSize: 12 },
  subText: { color: '#666', fontSize: 12 },
  whiteText: { color: '#fff' },
  qtyBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8 },
  qtyText: { fontSize: 18, fontWeight: '700', marginHorizontal: 8 },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 20 },
  addBtn: { flexDirection: 'row', backgroundColor: '#8B4513', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  addText: { color: '#fff', fontWeight: '700', marginLeft: 6 },
});