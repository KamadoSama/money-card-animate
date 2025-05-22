import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ImageBackground } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import FloatingCard from './FloatingCard';

interface BalanceSectionProps {
  isExpanded: SharedValue<boolean>;
  hideBalance: boolean;
  onToggleBalance: () => void;
  formatAmount: (amount: number) => string;
  totalBalance: number;
  cardImage: any;
}

const BalanceSection: React.FC<BalanceSectionProps> = ({ 
  isExpanded, 
  hideBalance, 
  onToggleBalance, 
  formatAmount, 
  totalBalance,
  cardImage 
}) => {
  return (
    <View style={styles.subBalanceContainer}>
      <View style={styles.cardsContainer}>
        <FloatingCard
          isExpanded={isExpanded}
          index={1}
          backgroundColor="#C5C5C5"
          device='Dollar'
          amount='$32,545'
          isSeeAll={true}
        />

        <FloatingCard
          isExpanded={isExpanded}
          index={2}
          backgroundColor="#ffc107"
          device='Dollar'
          amount='$32,545'
        />

        <FloatingCard
          isExpanded={isExpanded}
          index={3}
          backgroundColor="#2c5d86"
          device='Euro'
          amount='€32,545'
        />

        <FloatingCard
          isExpanded={isExpanded}
          index={4}
          backgroundColor="#ff7e36"
          device='Pounds'
          amount='£32,545'
        />
      </View>
      
      <ImageBackground contentFit='contain' style={styles.balanceContainer} source={cardImage}>
        <Text style={styles.totalBalanceAmount}>
          {!hideBalance ? '••••••' : `$${formatAmount(totalBalance)}`}
        </Text>
        <Text style={styles.totalBalanceLabel}>Total Balance</Text>

        <TouchableOpacity
          style={styles.hideBalanceButton}
          onPress={onToggleBalance}
        >
          <MaterialIcons name={!hideBalance ? "visibility" : "visibility-off"} size={16} color="#fff" />
          <Text style={styles.hideBalanceText}>
            {!hideBalance ? 'Show balance' : 'Hide balance'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  subBalanceContainer: {
    backgroundColor: '#0e86d4',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    padding: 8,
    marginVertical: 20,
    height: 250,
    borderRadius: 40,
  },
  cardsContainer: {
    marginTop: 10,
    paddingBottom: 20,
    width: "90%",
    position: 'absolute',
    height: 50,
    top: 55,
    alignSelf: 'center',
  },
  balanceContainer: {
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  totalBalanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  totalBalanceLabel: {
    fontSize: 16,
    color: '#e0e0e0',
    marginBottom: 15,
  },
  hideBalanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  hideBalanceText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default BalanceSection;