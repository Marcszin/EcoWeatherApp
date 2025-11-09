# 🌦️ EcoWeatherApp — Clima & Qualidade do Ar

Aplicativo móvel desenvolvido como Atividade Prática Supervisionada (APS) para o 8º semestre de **Ciência da Computação - UNIP**.  
O sistema permite que o usuário **busque uma cidade** e visualize:

- **Temperatura atual**
- **Índices de qualidade do ar (PM2.5, PM10 e CO)**

Tudo isso utilizando **APIs ambientais públicas** e arquitetura mobile com **React Native + Expo**.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|-----------|-----------|
| **React Native + Expo** | Desenvolvimento do app |
| **TypeScript** | Tipagem estática |
| **React Navigation** | Navegação entre telas |
| **Open-Meteo API** | Dados de clima |
| **Open-Meteo Air Quality API** | Dados de qualidade do ar |

---

## 📱 Funcionalidades

- Buscar cidades por nome
- Exibir **clima atual**
- Exibir **qualidade do ar**
- Interface simples e limpa
- Navegação intuitiva entre telas
- Tratamento de erros e entradas inválidas

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seuuser/ecoweatherapp.git
cd ecoweatherapp
```
### 2. Instalar dependências
```npm install```

### 3. Rodar o app (Expo)
```npx expo start```

Após isso, escolha uma opção:

a → abrir no emulador Android

w → abrir no navegador

QR Code → abrir no celular com o Expo Go

---

🌍 APIs Utilizadas
API	Endpoint	Descrição
Open-Meteo Weather	https://api.open-meteo.com/v1/forecast	Dados de clima
Open-Meteo Air Quality	https://air-quality-api.open-meteo.com/v1/air-quality	Índices de poluentes
Open-Meteo Geocoding	https://geocoding-api.open-meteo.com/v1/search	Conversão de nome da cidade para coordenadas

---

🖼️ Telas do App

1. <img width="526" height="1040" alt="image" src="https://github.com/user-attachments/assets/eef6aa9a-82a7-4b8f-a0de-40390de54d6f" />

2. <img width="527" height="1046" alt="image" src="https://github.com/user-attachments/assets/8ed30d42-5651-4831-b74e-00d9be312d83" />

3. <img width="528" height="1035" alt="image" src="https://github.com/user-attachments/assets/30ebb9bd-2820-4c44-8aae-424d517aa2f1" />
