import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BRANCHES, BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';

export default function ReservationScreen({ onPlaced, onBack }) {
  const { cart, subtotal, placeReservation } = useCart();
  const { user } = useAuth();
  const branch = BRANCHES[0];

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const confirm = () => {
    if (!cart.length || !date.trim() || !time.trim() || !name.trim() || !phone.trim()) return;

    const order = placeReservation({
      branch: `${branch.name} — ${branch.address}`,
      dayLabel: date.trim(),
      dayKey: date.trim(),
      time: time.trim(),
      name: name.trim(),
      phone: phone.trim(),
      payment: 'Pay at counter',
      notes: notes.trim(),
    });

    onPlaced(order);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Pre-Order</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.banner}>
          <Ionicons name="storefront-outline" size={18} color={BROWN} />
          <Text style={{ flex: 1, color: '#6b5546', fontSize: 12 }}>
            Pick-up only. Collect your pre-order at the counter.
          </Text>
        </View>

        <View style={styles.staticBox}>
          <View style={styles.row}>
            <Text style={{ color: '#777' }}>Branch</Text>
            <Text style={{ fontWeight: '600', color: '#333' }}>{branch.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#777' }}>Payment</Text>
            <Text style={{ fontWeight: '600', color: '#333' }}>Pay at counter</Text>
          </View>
        </View>

        <Text style={styles.label}>Pick-up date</Text>
        <TextInput placeholder="e.g. Today, Tomorrow" value={date} onChangeText={setDate} style={styles.input} />

        <Text style={styles.label}>Pick-up time</Text>
        <TextInput placeholder="e.g. 10:30 AM" value={time} onChangeText={setTime} style={styles.input} />

        <Text style={styles.label}>Who is picking up</Text>
        <TextInput placeholder="Full name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Mobile number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" style={styles.input} />

        <Text style={styles.label}>Notes for the barista</Text>
        <TextInput placeholder="Less ice, extra shot..." value={notes} onChangeText={setNotes} multiline style={[styles.input, { height: 70, textAlignVertical: 'top' }]} />

        <View style={styles.summary}>
          <View style={styles.row}>
            <Text style={{ color: '#777' }}>Total Items</Text>
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#333' }}>{cart.length} items</Text>
          </View>
          <View style={styles.row}>
            <Text style={{ color: '#777' }}>Pick-up Schedule</Text>
            <Text style={{ fontWeight: '600', fontSize: 13, color: '#333' }}>{date && time ? `${date}, ${time}` : '—'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={{ color: '#777' }}>Total Amount</Text>
            <Text style={{ fontWeight: '700', fontSize: 16, color: BROWN }}>₱{subtotal}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.confirmBtn} onPress={confirm}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Confirm reservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: CREAM, borderRadius: 12, padding: 12, marginBottom: 16 },
  staticBox: { backgroundColor: '#f9f9f9', borderRadius: 12, padding: 12, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4, alignItems: 'center' },
  label: { fontSize: 15, fontWeight: '700', marginTop: 14, marginBottom: 6, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 4, backgroundColor: '#fff' },
  summary: { backgroundColor: CREAM, borderRadius: 12, padding: 14, marginTop: 16 },
  divider: { height: 1, backgroundColor: '#e3d7c9', marginVertical: 8 },
  confirmBtn: { backgroundColor: BROWN, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 16 },
});