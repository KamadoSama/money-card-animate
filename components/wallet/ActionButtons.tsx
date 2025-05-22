import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ActionButtons: React.FC = () => {
  return (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="arrow-upward" size={20} color="#333" />
        <Text style={styles.actionButtonText}>Transfer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <MaterialIcons name="add" size={20} color="#333" />
        <Text style={styles.actionButtonText}>Add money</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default ActionButtons;