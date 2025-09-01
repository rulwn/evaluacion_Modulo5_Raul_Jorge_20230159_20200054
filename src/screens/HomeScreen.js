import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user, userData, logout } = useAuth();

  // Función para obtener saludo según la hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días!';
    if (hour < 18) return '¡Buenas tardes!';
    return '¡Buenas noches!';
  };

  // Función para manejar cierre de sesión
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const menuItems = [
    {
      id: 1,
      title: 'Mi Perfil',
      subtitle: 'Ver y editar información personal',
      icon: 'person',
      color: '#4CAF50',
      onPress: () => navigation.navigate('ProfileTab'),
    },
    {
      id: 2,
      title: 'Productos',
      subtitle: 'Gestionar productos de la tienda',
      icon: 'inventory',
      color: '#FF9800',
      onPress: () => navigation.navigate('ProductsTab'),
    },
    {
      id: 3,
      title: 'Estadísticas',
      subtitle: 'Ver reportes y análisis',
      icon: 'analytics',
      color: '#9C27B0',
      onPress: () => {
        // Aquí podrías navegar a una pantalla de estadísticas
        console.log('Navegando a estadísticas...');
      },
    },
    {
      id: 4,
      title: 'Configuración',
      subtitle: 'Ajustes de la aplicación',
      icon: 'settings',
      color: '#607D8B',
      onPress: () => {
        // Aquí podrías navegar a una pantalla de configuración
        console.log('Navegando a configuración...');
      },
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header con información del usuario */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.userName}>
              {userData?.nombre || user?.displayName || 'Usuario'}
            </Text>
            {userData?.especialidad && (
              <Text style={styles.userSpecialty}>{userData.especialidad}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tarjetas de información rápida */}
      <View style={styles.quickStats}>
        <View style={styles.statCard}>
          <MaterialIcons name="inventory" size={32} color="#FF9800" />
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Productos</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="shopping-cart" size={32} color="#4CAF50" />
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Vendidos</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="attach-money" size={32} color="#2196F3" />
          <Text style={styles.statNumber}>$540</Text>
          <Text style={styles.statLabel}>Ganancias</Text>
        </View>
      </View>

      {/* Menú principal */}
      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Menú Principal</Text>
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIcon, { backgroundColor: item.color }]}>
                <MaterialIcons name={item.icon} size={28} color="#ffffff" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sección de actividad reciente */}
      <View style={styles.activitySection}>
        <Text style={styles.sectionTitle}>Actividad Reciente</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <MaterialIcons name="add-circle" size={24} color="#4CAF50" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Producto agregado</Text>
            <Text style={styles.activitySubtitle}>
              Se agregó un nuevo producto a la tienda
            </Text>
            <Text style={styles.activityTime}>Hace 2 horas</Text>
          </View>
        </View>
        <View style={styles.activityCard}>
          <View style={styles.activityIcon}>
            <MaterialIcons name="edit" size={24} color="#FF9800" />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Perfil actualizado</Text>
            <Text style={styles.activitySubtitle}>
              Se actualizó la información del perfil
            </Text>
            <Text style={styles.activityTime}>Hace 1 día</Text>
          </View>
        </View>
      </View>

      {/* Información del instituto */}
      <View style={styles.instituteInfo}>
        <Text style={styles.instituteName}>Instituto Técnico Ricaldone</Text>
        <Text style={styles.instituteModule}>Módulo 5: Desarrollo de componentes para dispositivos móviles</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#0288d1',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  userSpecialty: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  logoutButton: {
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  menuSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    backgroundColor: '#ffffff',
    width: (width - 60) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
    textAlign: 'center',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  activitySection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  activityCard: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  instituteInfo: {
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  instituteName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: 4,
    textAlign: 'center',
  },
  instituteModule: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default HomeScreen;