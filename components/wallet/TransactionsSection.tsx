import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionItem from './TransactionItem';

const TransactionsSection: React.FC = () => {
  return (
    <View style={styles.transactionsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Transactions</Text>
        <Text style={styles.seeMoreText}>See all</Text>
      </View>

      <View style={styles.transactionsList}>
        <TransactionItem
          title="From Figma/USD"
          date="1 day ago"
          amount="$10,000.00"
          status="Successful"
          iconName="favorite"
          iconColor="#4CAF50"
          iconBgColor="#e8f5e9"
        />

        <TransactionItem
          title="From Figma/USD"
          date="1 day ago"
          amount="$10,000.00"
          status="Successful"
          iconName="favorite"
          iconColor="#4CAF50"
          iconBgColor="#e8f5e9"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionsSection: {
    marginBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#888',
  },
  transactionsList: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default TransactionsSection;