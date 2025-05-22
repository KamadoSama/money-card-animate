import image from '@/constants/image'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'

// Composants
import ActionButtons from '@/components/wallet/ActionButtons'
import BalanceSection from '@/components/wallet/BalanceSection'
import Header from '@/components/wallet/Header'
import SpendSaveSection from '@/components/wallet/SpendSaveSection'
import TransactionsSection from '@/components/wallet/TransactionsSection'

const WalletScreen = () => {
  // État pour gérer l'affichage/masquage du solde
  const [hideBalance, setHideBalance] = React.useState(false)

  // Animation pour les cartes de devises
  const cardOffset = useSharedValue(0)
  const isExpanded = useSharedValue(false)

  React.useEffect(() => {
    // Animation d'entrée des cartes au chargement
    cardOffset.value = withTiming(1, { duration: 500 })
  }, [])

  // Fonction pour formater les montants avec séparateurs de milliers
  const formatAmount = (amount: number): string => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const handleToggleBalance = () => {
    isExpanded.value = !isExpanded.value
    setHideBalance(!hideBalance)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <Header userName="Kamado" />
        
        <BalanceSection 
          isExpanded={isExpanded}
          hideBalance={hideBalance}
          onToggleBalance={handleToggleBalance}
          formatAmount={formatAmount}
          totalBalance={98000}
          cardImage={image.card}
        />
        
        <ActionButtons />
        <SpendSaveSection />
        <TransactionsSection />
      </ScrollView>
    </SafeAreaView>
  )
}

export default WalletScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
})