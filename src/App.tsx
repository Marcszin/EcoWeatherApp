import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Localizacao from './screens/Localizacao';
import Clima from './screens/Clima';
import QualidadeAr from './screens/QualidadeAr';

export type RootStackParamList = {
  Localizacao: undefined;
  Clima: { latitude: number; longitude: number; cidade: string };
  QualidadeAr: { latitude: number; longitude: number; cidade: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const WhiteTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: '#ffffff', card: '#ffffff' },
};

export default function App() {
  return (
    <NavigationContainer theme={WhiteTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: true,
          headerStyle: { backgroundColor: '#eaf7f1' }, // header suave
          headerTitleStyle: { color: '#0f5132', fontWeight: '700' },
          headerTintColor: '#0f5132',
        }}
      >
        <Stack.Screen
          name="Localizacao"
          component={Localizacao}
          options={{ title: 'Buscar cidade' }}
        />
        <Stack.Screen
          name="Clima"
          component={Clima}
          options={({ route }) => ({ title: `☀️  Clima • ${route.params.cidade}` })}
        />
        <Stack.Screen
          name="QualidadeAr"
          component={QualidadeAr}
          options={({ route }) => ({ title: `🌫️  Ar • ${route.params.cidade}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
