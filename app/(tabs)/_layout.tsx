import CustomTabBar from '@/components/CustomTab';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function TabsEntrepriseLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
            tabBar={props => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="index" options={{ title: 'Accueil' }} />
            <Tabs.Screen name="wallet" options={{ title: 'Recherche' }} />
            <Tabs.Screen name="history" options={{ title: 'Publier' }} />
            <Tabs.Screen name="settings" options={{ title: 'Messages' }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
      display: 'none',
    }
  });
