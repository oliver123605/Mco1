import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../Context/CartContext';
import ItemImage from './ItemImage';

export default function CartScreen({ onReserve }) {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.cartId}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Your cart is empty. Add something from the menu to pre-order it.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageBox}>
              <ItemImage id={item.id} size={24} />
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>{item.size} · Sugar {item.sugar}</Text>
              <Text style={styles.price}>₱{item.price * item.qty}</Text>
            </View>

            <View style={styles.qtyRow}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.cartId, -1)}>
                <Ionicons name="remove" size={14} color="#333" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.qty}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => updateQty(item.cartId, 1)}>
                <Ionicons name="add" size={14} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 6 }} onPress={() => removeFromCart(item.cartId)}>
                <Ionicons name="trash-outline" size={18} color="#cc0000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={{ color: '#666', fontSize: 16 }}>Subtotal</Text>
            <Text style={styles.totalAmount}>₱{subtotal}</Text>
          </View>
          <Text style={styles.pickupNote}>Pick-up only.</Text>
          <TouchableOpacity style={styles.reserveBtn} onPress={onReserve}>
            <Ionicons name="calendar-outline" size={18} color="#fff" />
            <Text style={styles.reserveText}>Pre-Order Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  emptyText: { marginTop: 20, color: '#888', textAlign: 'center' },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', borderRadius: 12, padding: 12, marginBottom: 10 },
  imageBox: { width: 48, height: 48, backgroundColor: '#FFF8F0', borderRadius: 10, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  info: { flex: 1, marginLeft: 12 },
  name: { fontWeight: '600', fontSize: 15 },
  meta: { color: '#666', fontSize: 12, marginTop: 2 },
  price: { color: '#8B4513', fontWeight: '700', marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  qtyBtn: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 4, backgroundColor: '#fff' },
  qtyText: { fontWeight: '700', fontSize: 14, marginHorizontal: 4 },
  footer: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalAmount: { fontSize: 20, fontWeight: '700', color: '#333' },
  pickupNote: { color: '#888', fontSize: 12, marginTop: 4 },
  reserveBtn: { flexDirection: 'row', backgroundColor: '#8B4513', padding: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  reserveText: { color: '#fff', fontWeight: '700', marginLeft: 8, fontSize: 16 },
});