import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';

import { TripsScreen } from '../screens/TripsScreen';
import { NowScreen } from '../screens/NowScreen';
import { ItineraryScreen } from '../screens/ItineraryScreen';
import { DocsScreen } from '../screens/DocsScreen';
import { ItemScreen } from '../screens/ItemScreen';
import { PassesScreen } from '../screens/PassesScreen';
import { TripFormScreen } from '../screens/TripFormScreen';
import { ItemFormScreen } from '../screens/ItemFormScreen';
import { font } from '../theme/tokens';
import { useTheme } from '../theme/useTheme';
import type { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

/** Abas sem ícone: rótulo em caixa alta, como painel de aeroporto. */
function TabsNavigator() {
  const t = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: t.ink,
        tabBarInactiveTintColor: t.ink3,
        tabBarStyle: { backgroundColor: t.paper, borderTopColor: t.rule, borderTopWidth: 1 },
        tabBarLabelStyle: {
          fontFamily: font.monoBold,
          fontSize: 9,
          letterSpacing: 1.4,
          textTransform: 'uppercase',
        },
        tabBarIcon: () => null,
      }}
    >
      <Tabs.Screen name="Trips" component={TripsScreen} options={{ title: 'Viagens' }} />
      <Tabs.Screen name="Now" component={NowScreen} options={{ title: 'Agora' }} />
      <Tabs.Screen name="Itinerary" component={ItineraryScreen} options={{ title: 'Itinerário' }} />
      <Tabs.Screen name="Docs" component={DocsScreen} options={{ title: 'Docs' }} />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const t = useTheme();
  const scheme = useColorScheme();
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  const navTheme = {
    ...base,
    colors: {
      ...base.colors,
      background: t.paper2,
      card: t.paper,
      text: t.ink,
      border: t.rule,
      primary: t.stamp,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: t.paper },
          headerTintColor: t.stamp,
          headerTitleStyle: { fontFamily: font.uiBold, fontSize: 17, color: t.ink },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: t.paper2 },
        }}
      >
        <Stack.Screen name="Tabs" component={TabsNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="Item"
          component={ItemScreen}
          options={{ title: 'Reserva', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen
          name="Passes"
          component={PassesScreen}
          options={{ title: 'Cartões de embarque', headerBackTitle: 'Voltar' }}
        />
        <Stack.Screen
          name="TripForm"
          component={TripFormScreen}
          options={({ route }) => ({
            title: route.params?.id ? 'Editar viagem' : 'Nova viagem',
            headerBackTitle: 'Voltar',
            presentation: 'modal',
          })}
        />
        <Stack.Screen
          name="ItemForm"
          component={ItemFormScreen}
          options={({ route }) => ({
            title: route.params?.id ? 'Editar reserva' : 'Nova reserva',
            headerBackTitle: 'Voltar',
            presentation: 'modal',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
