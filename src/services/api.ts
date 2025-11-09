import axios from 'axios';

/** Geocoding (cidade -> lat/lon) */
export async function geocodeCity(name: string) {
  const url =
    `https://geocoding-api.open-meteo.com/v1/search?` +
    `name=${encodeURIComponent(name)}&count=1&language=pt&format=json`;

  const { data } = await axios.get(url);
  const r = data?.results?.[0];
  if (!r) throw new Error('Cidade não encontrada');

  return {
    latitude: r.latitude,
    longitude: r.longitude,
    cidade: r.name as string,
  };
}

/** Clima atual */
export async function getClima(lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current_weather=true`;

  const { data } = await axios.get(url);
  const cw = data?.current_weather;
  if (!cw) throw new Error('Sem dados de clima');

  // padroniza pro componente
  return {
    temperature: cw.temperature,
    windspeed: cw.windspeed,
    winddirection: cw.winddirection,
  };
}

/** Qualidade do ar (valores horários – pegamos o primeiro item disponível) */
export async function getQualidadeAr(lat: number, lon: number) {
  const url =
    `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}` +
    `&hourly=pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,ozone,sulphur_dioxide`;

  const { data } = await axios.get(url);
  const h = data?.hourly;
  if (!h) throw new Error('Sem dados de qualidade do ar');

  const pick = (arr?: number[]) => (Array.isArray(arr) && arr.length ? arr[0] : undefined);

  return {
    pm25: pick(h.pm2_5),
    pm10: pick(h.pm10),
    co: pick(h.carbon_monoxide),
    no2: pick(h.nitrogen_dioxide),
    o3: pick(h.ozone),
    so2: pick(h.sulphur_dioxide),
  };
}

/** Cores/rotulo simples pela concentração de PM2.5 (µg/m³) */
export function corQualidade(pm25?: number) {
  if (pm25 == null) return { cor: '#6b7280', texto: '—' };
  if (pm25 <= 12) return { cor: '#16a34a', texto: 'Boa' };
  if (pm25 <= 35.4) return { cor: '#f59e0b', texto: 'Moderada' };
  if (pm25 <= 55.4) return { cor: '#f97316', texto: 'Preocupante' };
  if (pm25 <= 150.4) return { cor: '#ef4444', texto: 'Ruim' };
  return { cor: '#7e22ce', texto: 'Muito Ruim' };
}
