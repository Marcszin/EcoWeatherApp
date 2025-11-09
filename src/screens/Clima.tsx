import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import { getClima } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Clima'>;

export default function Clima({ route }: Props) {
  const { latitude, longitude, cidade } = route.params || {};
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (latitude == null || longitude == null) throw new Error('Coordenadas inválidas');
        setErro(null);
        const r = await getClima(latitude, longitude);
        setDados(r);
      } catch (e: any) {
        setErro(e?.message || 'Erro ao buscar clima');
      }
    })();
  }, [latitude, longitude]);

  if (erro) return <Text style={styles.erro}>{erro}</Text>;
  if (!dados) return <ActivityIndicator size="large" style={{ marginTop: 24 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.cidade}>{cidade}</Text>
      <Text style={styles.valor}>🌡️ {dados.temperature}°C</Text>
      <Text style={styles.info}>Vento: {dados.windspeed} km/h</Text>
      <Text style={styles.info}>Direção: {dados.winddirection}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  cidade: { fontSize: 22, fontWeight: '700', marginBottom: 8, color: '#0f5132' },
  valor: { fontSize: 42, fontWeight: '800', marginBottom: 10 },
  info: { fontSize: 18, color: '#444' },
  erro: { color: '#EF4444', padding: 20 },
});
