import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface TransactionItemProps {
  title: string;
  date: string;
  amount: string;
  status: string;
  iconName: string;
  iconColor: string;
  iconBgColor: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ 
  title, 
  date, 
  amount, 
  status, 
  iconName, 
  iconColor, 
  iconBgColor 
}) => {
  return (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[styles.transactionIconContainer, { backgroundColor: iconBgColor }]}>
          <MaterialIcons name={iconName} size={20} color={iconColor} />
        </View>
        <View>
          <Text style={styles.transactionTitle}>{title}</Text>
          <Text style={styles.transactionDate}>{date}</Text>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <Text style={styles.transactionAmount}>{amount}</Text>
        <Text style={[styles.transactionStatus, { color: status === 'Successful' ? '#4CAF50' : '#F44336' }]}>
          {status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  transactionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  transactionStatus: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default TransactionItem;