import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SharedValue } from 'react-native-reanimated';

const OFFSET = 28;
// Constantes pour l'animation
const BASE_DURATION = 500;
const DURATION_MULTIPLIER = 700;
const EXPANDED_MOVE_MULTIPLIER = 30;
const EXPANDED_INDEX_FACTOR = 1.1;
const COLLAPSED_MOVE_MULTIPLIER = OFFSET;
const DAMPING_VALUE = 10;
const MAX_CARDS = 5; 
const DEFAULT_CARD_OFFSET = 4; 

interface FloatingCardProps {
  isExpanded: SharedValue<boolean>;
  index: number;
  backgroundColor?: string;
  device?: string;
  amount?: string;
  isSeeAll?: boolean;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  isExpanded, 
  index, 
  backgroundColor, 
  device, 
  amount, 
  isSeeAll = false 
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    const SPRING_CONFIG = {
      duration: isExpanded.value ? BASE_DURATION : DURATION_MULTIPLIER * (MAX_CARDS - index),
      overshootClamping: true,
      damping: DAMPING_VALUE,
    };
    
    const moveValue = isExpanded.value 
      ? EXPANDED_MOVE_MULTIPLIER * (MAX_CARDS - index * EXPANDED_INDEX_FACTOR) 
      : COLLAPSED_MOVE_MULTIPLIER * (DEFAULT_CARD_OFFSET - index);
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);

    return {
      transform: [
        { translateY: translateValue },
      ],
    };
  });

  return (
    <Animated.View style={[animatedStyles, styles.currencyCard, { backgroundColor }]}>
      {
        isSeeAll ? (
          <TouchableOpacity style={styles.seeAllHeader}>
            <Text style={styles.sectionTitle}>See all</Text>
            <MaterialIcons name="chevron-right" size={20} color="#888" />
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.currencyName}>{device}</Text>
            <Text style={styles.currencyAmount}>{!isExpanded.value ? '••••••' : amount}</Text>
          </>
        )
      }
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  currencyCard: {
    height: 80,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: "100%",
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  currencyAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  seeAllHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
  },
  sectionTitle: {
    fontSize: 14,
    color: '#888',
  },
});

export default FloatingCard;