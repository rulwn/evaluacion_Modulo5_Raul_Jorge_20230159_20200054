import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { user, userData, logout } = useAuth();

  // Función para manejar cierre de sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ]
    );
  };

  // Función para navegar a editar perfil
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  // Opciones del menú de perfil
  const menuOptions = [
    {
      id: 1,
      title: 'Editar Información Personal',
      subtitle: 'Actualizar nombre, edad y especialidad',
      icon: 'edit',
      color: '#4CAF50',
      onPress: handleEditProfile,
    },
    {
      id: 2,
      title: 'Cambiar Contraseña',
      subtitle: 'Actualizar contraseña de acceso',
      icon: 'lock',
      color: '#FF9800',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta función estará disponible pronto');
      },
    },
    {
      id: 3,
      title: 'Notificaciones',
      subtitle: 'Configurar alertas y notificaciones',
      icon: 'notifications',
      color: '#2196F3',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta función estará disponible pronto');
      },
    },
    {
      id: 4,
      title: 'Privacidad',
      subtitle: 'Configuraciones de privacidad',
      icon: 'privacy-tip',
      color: '#9C27B0',
      onPress: () => {
        Alert.alert('Próximamente', 'Esta función estará disponible pronto');
      },
    },
    {
      id: 5,
      title: 'Ayuda y Soporte',
      subtitle: 'Obtener ayuda y soporte técnico',
      icon: 'help',
      color: '#607D8B',
      onPress: () => {
        Alert.alert('Ayuda y Soporte', 'Contacta al desarrollador para obtener ayuda');
      },
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header del perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(userData?.nombre || user?.displayName || 'U').charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>
          {userData?.nombre || user?.displayName || 'Usuario'}
        </Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        {userData?.especialidad && (
          <Text style={styles.userSpecialty}>{userData.especialidad}</Text>
        )}
      </View>

      {/* Información del usuario */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons name="person" size={20} color="#0288d1" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Nombre</Text>
              <Text style={styles.infoValue}>
                {userData?.nombre || user?.displayName || 'No especificado'}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <MaterialIcons name="email" size={20} color="#0288d1" />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user?.email}</Text>
            </View>
          </View>

          {userData?.edad && (
            <View style={styles.infoRow}>
              <View style={styles.infoIconContainer}>
                <MaterialIcons name="cake" size={20} color="#0288d1" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Edad</Text>
                <Text style={styles.infoValue}>{userData.edad} años</Text>
              </View>
            </View>
          )}

          {userData?.especialidad && (
            <View style={[styles.infoRow, styles.lastInfoRow]}>
              <View style={styles.infoIconContainer}>
                <MaterialIcons name="school" size={20} color="#0288d1" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Especialidad</Text>
                <Text style={styles.infoValue}>{userData.especialidad}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Menú de opciones */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        {menuOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.menuOption}
            onPress={option.onPress}
            activeOpacity={0.7}
          >
            <View style={[styles.menuIconContainer, { backgroundColor: option.color }]}>
              <MaterialIcons name={option.icon} size={24} color="#ffffff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{option.title}</Text>
              <Text style={styles.menuSubtitle}>{option.subtitle}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Botón de cerrar sesión */}
      <View style={styles.logoutSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#ff5252" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Información de la aplicación */}
      <View style={styles.appInfo}>
        <Text style={styles.appInfoTitle}>EvaluaApp v1.0</Text>
        <Text style={styles.appInfoSubtitle}>
          Desarrollado para el Módulo 5{'\n'}
          Instituto Técnico Ricaldone
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  profileHeader: {
    backgroundColor: '#0288d1',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  userSpecialty: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastInfoRow: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  menuOption: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ff5252',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff5252',
    marginLeft: 8,
  },
  appInfo: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  appInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 4,
  },
  appInfoSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ProfileScreen;