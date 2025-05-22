import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const BottomNavigation: React.FC = () => {
  return (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity style={styles.navButton}>
        <MaterialIcons name="home" size={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <MaterialIcons name="credit-card" size={24} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <MaterialIcons name="history" size={24} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton}>
        <MaterialIcons name="settings" size={24} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNavigation;