import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@user_name';

export default function App() {
  const [inputName, setInputName] = useState('');
  const [savedName, setSavedName] = useState('');

  // Cargar el nombre almacenado al iniciar la app
  useEffect(() => {
    loadData();
  }, []);

  // Guardar datos en AsyncStorage
  const saveData = async () => {
    if (!inputName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido.');
      return;
    }
    try {
      await AsyncStorage.setItem(STORAGE_KEY, inputName);
      setSavedName(inputName);
      setInputName('');
      Alert.alert('Éxito', 'Nombre guardado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la información.');
    }
  };

  // Obtener datos de AsyncStorage
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setSavedName(value);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo recuperar la información.');
    }
  };

  // Eliminar datos de AsyncStorage
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSavedName('');
      Alert.alert('Eliminado', 'La información ha sido borrada.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la información.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>AsyncStorage en React Native</Text>
      <Text style={styles.resultText}>
        {savedName ? `Nombre Guardado: ${savedName}` : 'No hay datos guardados.'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu nombre..."
        value={inputName}
        onChangeText={setInputName}
      />
      <TouchableOpacity style={styles.btnSave} onPress={saveData}>
        <Text style={styles.btnText}>Guardar Nombre</Text>
      </TouchableOpacity>
      {savedName !== '' && (
        <TouchableOpacity style={styles.btnDelete} onPress={removeData}>
          <Text style={styles.btnText}>Eliminar Nombre</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#F5FCFF' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  resultText: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#007AFF', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: '#FFFFFF' },
  btnSave: { backgroundColor: '#28A745', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  btnDelete: { backgroundColor: '#DC3545', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
});
