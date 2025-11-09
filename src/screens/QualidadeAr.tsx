import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import { corQualidade, getQualidadeAr } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'QualidadeAr'>;

export default function QualidadeAr({ route }: Props) {
  const { latitude, longitude, cidade } = route.params || {};
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (latitude == null || longitude == null) throw new Error('Coordenadas inválidas');
        setErro(null);
        const r = await getQualidadeAr(latitude, longitude);
        setDados(r);
      } catch (e: any) {
        setErro(e?.message || 'Erro ao buscar qualidade do ar');
      }
    })();
  }, [latitude, longitude]);

  if (erro) return <Text style={styles.erro}>{erro}</Text>;
  if (!dados) return <ActivityIndicator size="large" style={{ marginTop: 24 }} />;

  const status = corQualidade(dados.pm25);

  return (
    <View style={styles.container}>
      <Text style={styles.cidade}>{cidade}</Text>

      <View style={[styles.pill, { borderColor: status.cor }]}>
        <Text style={[styles.pillText, { color: status.cor }]}>
          PM2.5: {dados.pm25 ?? '—'}  •  {status.texto}
        </Text>
      </View>

      <Text style={styles.info}>PM10: {dados.pm10 ?? '—'} µg/m³</Text>
      <Text style={styles.info}>CO: {dados.co ?? '—'} µg/m³</Text>
      <Text style={styles.info}>NO₂: {dados.no2 ?? '—'} µg/m³</Text>
      <Text style={styles.info}>O₃: {dados.o3 ?? '—'} µg/m³</Text>
      <Text style={styles.info}>SO₂: {dados.so2 ?? '—'} µg/m³</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 20 },
  cidade: { fontSize: 22, fontWeight: '700', marginBottom: 16, color: '#0f5132' },
  info: { fontSize: 18, color: '#444', marginTop: 6 },
  erro: { color: '#EF4444', padding: 20 },
  pill: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    marginBottom: 12,
  },
  pillText: { fontSize: 18, fontWeight: '700' },
});
