import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatCard from './StatCard';

const SpendSaveSection: React.FC = () => {
  return (
    <View style={styles.spendSaveSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>Spend & Save</Text>
        <Text style={styles.seeMoreText}>See more</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatCard
          title="Expenses in Apr"
          amount="$2,310"
          subtext="spent out of $5,000"
          progressPercentage="46%"
          segments={[
            { flex: 3, backgroundColor: '#ff7e36' },
            { flex: 2, backgroundColor: '#ffc107' },
            { flex: 1, backgroundColor: '#2c5d86' },
          ]}
        />

        <StatCard
          title="Savings"
          amount="$7,310"
          subtext="saved out of $10,000"
          progressPercentage="73%"
          segments={[
            { flex: 2, backgroundColor: '#ff7e36' },
            { flex: 2, backgroundColor: '#ffc107' },
            { flex: 3, backgroundColor: '#2c5d86' },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spendSaveSection: {
    marginBottom: 25,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SpendSaveSection;