import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DRINKS, BROWN, CREAM } from '../Data/menuData';
import { useCart } from '../Context/CartContext';
import ItemImage, { ShopLogo } from './ItemImage';

export default function MenuScreen({ onSelectDrink }) {
  const { favorites, toggleFavorite } = useCart();
  const coffeeDrinks = DRINKS.filter((drink) => drink.category === 'Coffee');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <ShopLogo size={34} />
        <View>
          <Text style={styles.shopName}>KAPI KAM CAFE</Text>
          <Text style={styles.shopSub}>COFFEE SHOP</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <Text style={styles.menuTitle}>Menu:</Text>
      </View>

      <FlatList
        data={coffeeDrinks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ gap: 12 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No coffee items available.</Text>}
        renderItem={({ item }) => {
          const isFavorite = favorites.includes(item.id);

          return (
            <View style={styles.drinkCard}>
              <View style={styles.imageBox}>
                <ItemImage id={item.id} emoji={item.emoji} size={40} />
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                  style={styles.favIcon}
                  hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
                >
                  <Ionicons
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    size={16}
                    color={isFavorite ? BROWN : '#555'}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ padding: 10 }}>
                <Text style={styles.drinkName} numberOfLines={1}>
                  {item.name}
                </Text>
                <View style={styles.drinkRow}>
                  <Text style={styles.drinkPrice}>₱{item.prices.Small}</Text>
                  <TouchableOpacity style={styles.addBtnSmall} onPress={() => onSelectDrink(item)}>
                    <Text style={styles.addBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 10 },
  shopName: { fontWeight: '700', fontSize: 16 },
  shopSub: { fontSize: 10, color: '#999' },
  menuTitle: { fontSize: 20, fontWeight: '700', color: '#333' },
  drinkCard: {
    flex: 1,
    maxWidth: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 14,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 3 },
    }),
  },
  imageBox: { width: '100%', aspectRatio: 1, backgroundColor: CREAM },
  favIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drinkName: { fontWeight: '600', marginBottom: 4, fontSize: 14 },
  drinkRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  drinkPrice: { fontWeight: '700', color: BROWN },
  addBtnSmall: { backgroundColor: BROWN, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  addBtnText: { color: '#fff', fontWeight: '600', fontSize: 12 },
  emptyText: { color: '#888', marginTop: 24, textAlign: 'center' },
});