import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressSegment {
  flex: number;
  backgroundColor: string;
}

interface StatCardProps {
  title: string;
  amount: string;
  subtext: string;
  progressPercentage: string;
  segments: ProgressSegment[];
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  amount, 
  subtext, 
  progressPercentage, 
  segments 
}) => {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statCardTitle}>{title}</Text>
      <Text style={styles.statAmount}>{amount}</Text>
      <Text style={styles.statSubtext}>{subtext}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progressPercentage }]}>
          {segments.map((segment, index) => (
            <View 
              key={index} 
              style={[styles.progressBarSegment, { 
                flex: segment.flex, 
                backgroundColor: segment.backgroundColor 
              }]} 
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statCardTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  statAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statSubtext: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    flexDirection: 'row',
    borderRadius: 4,
  },
  progressBarSegment: {
    height: '100%',
  },
});

export default StatCard;