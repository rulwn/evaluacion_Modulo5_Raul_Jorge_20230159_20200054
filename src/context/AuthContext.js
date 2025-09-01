import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, database } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // Registrar usuario
  const register = async (email, password, additionalData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(user, {
        displayName: additionalData.nombre
      });

      // Guardar información adicional en Firestore
      await setDoc(doc(database, 'users', user.uid), {
        uid: user.uid,
        email: email,
        nombre: additionalData.nombre,
        edad: additionalData.edad,
        especialidad: additionalData.especialidad,
        createdAt: new Date().toISOString()
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // Iniciar sesión
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  // Obtener datos del usuario desde Firestore
  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(database, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo datos del usuario:', error);
      return null;
    }
  };

  // Actualizar datos del usuario
  const updateUserData = async (uid, newData) => {
    try {
      await setDoc(doc(database, 'users', uid), newData, { merge: true });
      
      // Si se actualiza el nombre, también actualizar el perfil de Auth
      if (newData.nombre) {
        await updateProfile(auth.currentUser, {
          displayName: newData.nombre
        });
      }
      
      // Actualizar el estado local
      setUserData(prevData => ({ ...prevData, ...newData }));
      return true;
    } catch (error) {
      console.error('Error actualizando datos del usuario:', error);
      throw error;
    }
  };

  // Efecto para escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Obtener datos adicionales del usuario
        const additionalData = await getUserData(user.uid);
        setUserData(additionalData);
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userData,
    loading,
    register,
    login,
    logout,
    updateUserData,
    getUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};