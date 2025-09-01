import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const EditProfileScreen = ({ navigation }) => {
  const { user, userData, updateUserData } = useAuth();

  const [formData, setFormData] = useState({
    nombre: userData?.nombre || user?.displayName || '',
    edad: userData?.edad?.toString() || '',
    especialidad: userData?.especialidad || '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Opciones de especialidades
  const especialidades = [
    'Desarrollo de Software',
    'Redes y Telecomunicaciones',
    'Soporte Técnico',
    'Diseño Gráfico',
    'Marketing Digital',
    'Administración',
    'Contabilidad',
    'Electricidad',
    'Electrónica',
    'Mecánica Automotriz',
  ];

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.edad) {
      newErrors.edad = 'La edad es requerida';
    } else if (parseInt(formData.edad) < 16 || parseInt(formData.edad) > 100) {
      newErrors.edad = 'La edad debe estar entre 16 y 100 años';
    }

    if (!formData.especialidad) {
      newErrors.especialidad = 'La especialidad es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar actualización del perfil
  const handleUpdateProfile = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const updatedData = {
        nombre: formData.nombre.trim(),
        edad: parseInt(formData.edad),
        especialidad: formData.especialidad,
        updatedAt: new Date().toISOString(),
      };

      await updateUserData(user.uid, updatedData);

      Alert.alert(
        'Perfil Actualizado',
        'Tu información se ha actualizado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      Alert.alert('Error', 'No se pudo actualizar el perfil. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  // Actualizar datos del formulario
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="close" size={24} color="#0288d1" />
          </TouchableOpacity>
          <Text style={styles.title}>Editar Perfil</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(formData.nombre || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Campo Nombre */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre Completo</Text>
            <View style={[styles.inputWrapper, errors.nombre && styles.inputError]}>
              <MaterialIcons 
                name="person" 
                size={20} 
                color={errors.nombre ? '#ff5252' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Tu nombre completo"
                placeholderTextColor="#999"
                value={formData.nombre}
                onChangeText={(text) => updateFormData('nombre', text)}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
            {errors.nombre && <Text style={styles.errorText}>{errors.nombre}</Text>}
          </View>

          {/* Campo Edad */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Edad</Text>
            <View style={[styles.inputWrapper, errors.edad && styles.inputError]}>
              <MaterialIcons 
                name="cake" 
                size={20} 
                color={errors.edad ? '#ff5252' : '#666'} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={styles.input}
                placeholder="Tu edad"
                placeholderTextColor="#999"
                value={formData.edad}
                onChangeText={(text) => updateFormData('edad', text)}
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            {errors.edad && <Text style={styles.errorText}>{errors.edad}</Text>}
          </View>

          {/* Campo Especialidad */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Especialidad</Text>
            <View style={[styles.pickerWrapper, errors.especialidad && styles.inputError]}>
              <MaterialIcons 
                name="school" 
                size={20} 
                color={errors.especialidad ? '#ff5252' : '#666'} 
                style={styles.inputIcon} 
              />
              <Picker
                selectedValue={formData.especialidad}
                onValueChange={(itemValue) => updateFormData('especialidad', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecciona una especialidad" value="" />
                {especialidades.map((especialidad, index) => (
                  <Picker.Item key={index} label={especialidad} value={especialidad} />
                ))}
              </Picker>
            </View>
            {errors.especialidad && <Text style={styles.errorText}>{errors.especialidad}</Text>}
          </View>

          {/* Información adicional */}
          <View style={styles.infoBox}>
            <MaterialIcons name="info" size={20} color="#0288d1" style={styles.infoIcon} />
            <Text style={styles.infoText}>
              Esta información será visible en tu perfil y se utilizará para personalizar tu experiencia en la aplicación.
            </Text>
          </View>

          {/* Botones */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.disabledButton]}
              onPress={handleUpdateProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  <MaterialIcons name="save" size={20} color="#ffffff" style={styles.buttonIcon} />
                  <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información de seguridad */}
        <View style={styles.securityInfo}>
          <View style={styles.securityCard}>
            <MaterialIcons name="security" size={24} color="#4CAF50" />
            <View style={styles.securityContent}>
              <Text style={styles.securityTitle}>Información Segura</Text>
              <Text style={styles.securitySubtitle}>
                Tus datos están protegidos y encriptados
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 40,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0288d1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  emailText: {
    fontSize: 16,
    color: '#666',
  },
  form: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    height: 56,
  },
  inputError: {
    borderColor: '#ff5252',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingLeft: 16,
    height: 56,
  },
  picker: {
    flex: 1,
    height: 56,
  },
  errorText: {
    fontSize: 14,
    color: '#ff5252',
    marginTop: 4,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  infoIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1565c0',
    lineHeight: 20,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  saveButton: {
    backgroundColor: '#0288d1',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 56,
    marginBottom: 12,
    shadowColor: '#0288d1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#90caf9',
    shadowOpacity: 0.1,
    elevation: 2,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonIcon: {
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    height: 56,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  securityInfo: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  securityCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  securityContent: {
    marginLeft: 12,
    flex: 1,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  securitySubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default EditProfileScreen;