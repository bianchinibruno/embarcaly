import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  FamiljenGrotesk_400Regular,
  FamiljenGrotesk_500Medium,
  FamiljenGrotesk_700Bold,
} from '@expo-google-fonts/familjen-grotesk';
import {
  AzeretMono_400Regular,
  AzeretMono_500Medium,
  AzeretMono_600SemiBold,
} from '@expo-google-fonts/azeret-mono';

import { RootNavigator } from './src/navigation/RootNavigator';
import { AppStateProvider } from './src/state/AppState';
import { ConfirmProvider } from './src/components/Confirm';

export default function App() {
  const [loaded] = useFonts({
    FamiljenGrotesk_400Regular,
    FamiljenGrotesk_500Medium,
    FamiljenGrotesk_700Bold,
    AzeretMono_400Regular,
    AzeretMono_500Medium,
    AzeretMono_600SemiBold,
  });

  // A splash nativa segura a tela até a marca poder ser desenhada na fonte certa.
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <ConfirmProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </ConfirmProvider>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}
