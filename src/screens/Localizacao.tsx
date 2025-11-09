import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../App';
import { geocodeCity } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Localizacao'>;

export default function Localizacao({ navigation }: Props) {
  const [cidade, setCidade] = useState('São Paulo');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number; cidade: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function buscar() {
    try {
      setErro(null);
      setLoading(true);
      const res = await geocodeCity(cidade.trim());
      setCoords({ latitude: res.latitude, longitude: res.longitude, cidade: res.cidade });
    } catch (e: any) {
      setCoords(null);
      setErro('Cidade não encontrada');
    } finally {
      setLoading(false);
    }
  }

  function irParaClima() {
    if (!coords) return Alert.alert('Atenção', 'Busque a cidade primeiro.');
    navigation.navigate('Clima', { ...coords });
  }

  function irParaQualidade() {
    if (!coords) return Alert.alert('Atenção', 'Busque a cidade primeiro.');
    navigation.navigate('QualidadeAr', { ...coords });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🌍 Buscar cidade</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Digite uma cidade:</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            value={cidade}
            onChangeText={setCidade}
            placeholder="Ex.: São Paulo"
            returnKeyType="search"
            onSubmitEditing={buscar}
          />
          <TouchableOpacity style={styles.btnBuscar} onPress={buscar} disabled={loading}>
            <Text style={styles.btnBuscarText}>Buscar</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#4F8EF7" style={{ marginTop: 12 }} />}
        {erro && <Text style={styles.erro}>{erro}</Text>}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtnBlue} onPress={irParaClima}>
            <Text style={styles.actionText}>Ver Clima ☀️</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtnGreen} onPress={irParaQualidade}>
            <Text style={styles.actionText}>Qualidade do Ar 🌫️</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b3f6f8ff', padding: 20 },
  titulo: { fontSize: 26, fontWeight: '700', marginBottom: 14, textAlign: 'center', color: '#111' },
  card: {
    backgroundColor: '#d6e1e2ff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#333' },
  searchRow: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  btnBuscar: { height: 48, paddingHorizontal: 18, backgroundColor: '#a7a7a7ff', borderRadius: 12, justifyContent: 'center' },
  btnBuscarText: { color: '#fff', fontWeight: '700' },
  erro: { marginTop: 10, color: '#DC2626', textAlign: 'center' },
  actions: { marginTop: 24, gap: 12 },
  actionBtnBlue: { backgroundColor: '#4F8EF7', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  actionBtnGreen: { backgroundColor: '#34D399', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  actionText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
