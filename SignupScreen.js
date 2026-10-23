import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../Context/AuthContext';

export default function SignupScreen({ onGoLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us and get your favorite coffee anytime!</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.signupBtn} onPress={() => signup(name, email, password)}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 14 }} onPress={onGoLogin}>
        <Text style={{ textAlign: 'center', color: '#6B3E26', fontWeight: '600' }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#888', marginTop: 6, marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 14, marginBottom: 12 },
  signupBtn: { backgroundColor: '#6B3E26', padding: 16, borderRadius: 10, alignItems: 'center', marginTop: 4 },
});