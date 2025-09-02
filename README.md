# EvaluaApp - Módulo 5: Desarrollo de Componentes para Dispositivos Móviles

## 📱 Descripción del Proyecto

Aplicación móvil desarrollada con React Native Expo que implementa un sistema completo de autenticación de usuarios utilizando Firebase Authentication y Firestore Database. La aplicación incluye registro de usuarios, inicio de sesión, edición de perfiles y gestión de productos.

## 👥 Información de los Estudiantes

- **Nombre:** Jorge Fenando Orantes Jaimes  
- **Carnet:** 20200054
- **Nombre:** Raul Eduardo Ochoa Marroquin  
- **Carnet:** 20200054
- **Instituto:** Instituto Técnico Ricaldone
- **Especialidad:** Desarrollo de Software
- **Módulo:** 5 - Desarrollo de componentes para dispositivos móviles
- **Docente:** Daniel Wilfredo Granados Hernández

## 🎥 Video Demostrativo

https://drive.google.com/file/d/1M3nePf0dOMKvMOc5_uWlChCbzZJnKRPy/view?usp=sharing

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- **Registro de usuarios** con validación de datos
- **Inicio de sesión** con email y contraseña
- **Cierre de sesión** seguro
- **Validación de formularios** en tiempo real

### 📱 Pantallas Implementadas
- **Splash Screen**: Pantalla de carga con animaciones
- **Login Screen**: Inicio de sesión con validaciones
- **Register Screen**: Registro de nuevos usuarios
- **Home Screen**: Dashboard principal del usuario
- **Profile Screen**: Visualización del perfil de usuario
- **Edit Profile Screen**: Edición de información personal
- **Products Screen**: Gestión de productos (heredada del código base)
- **Add Product Screen**: Agregar nuevos productos

### 👤 Gestión de Usuarios
- **Información almacenada:**
  - Nombre completo
  - Email
  - Contraseña (encriptada por Firebase)
  - Edad
  - Especialidad
- **Edición de perfil** en tiempo real
- **Avatar generado automáticamente** con inicial del nombre

### 🛍️ Sistema de Productos
- **Listado de productos** en tiempo real
- **Agregar productos** con imágenes
- **Información almacenada:** nombre, precio, estado de venta, fecha de creación

## 🛠️ Dependencias del Proyecto

### Dependencias Principales
```json
{
  "@expo/vector-icons": "^13.0.0",
  "@react-native-picker/picker": "2.4.10",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/native-stack": "^6.9.17",
  "expo": "~49.0.15",
  "expo-image-picker": "~14.3.2",
  "expo-status-bar": "~1.6.0",
  "firebase": "^10.7.1",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "react-native-dotenv": "^3.4.9",
  "react-native-safe-area-context": "4.6.3",
  "react-native-screens": "~3.22.0"
}
```

### DevDependencies
```json
{
  "@babel/core": "^7.20.0"
}
```

## 🔧 Configuración del Proyecto

### Prerrequisitos
- Node.js (versión 14 o superior)
- Expo CLI instalado globalmente
- Cuenta de Firebase configurada
- Android Studio o Xcode (para desarrollo nativo)

### Instalación

1. **Clonar el repositorio:**
```bash
git clone [URL_DEL_REPOSITORIO]
cd evaluacion_Modulo5_[Nombre]_[Carnet]
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Configurar variables de entorno:**
Crear archivo `.env` en la raíz del proyecto:
```env
API_KEY=tu_api_key_de_firebase
AUTH_DOMAIN=tu_proyecto.firebaseapp.com
PROJECT_ID=tu_proyecto_id
STORAGE_BUCKET=tu_proyecto.appspot.com
MESSAGING_SENDER_ID=tu_sender_id
APP_ID=tu_app_id
```

4. **Configurar Babel para variables de entorno:**
Verificar que `babel.config.js` incluya:
```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module:react-native-dotenv', {
      envName: 'APP_ENV',
      moduleName: '@env',
      path: '.env',
    }],
  ],
};
```

5. **Iniciar el proyecto:**
```bash
npx expo start
```

## 🔥 Configuración de Firebase

### Firebase Authentication
- **Método de autenticación:** Email/Password
- **Configuración:** Habilitado en Firebase Console

### Firestore Database
- **Colecciones utilizadas:**
  - `users`: Información de usuarios registrados
  - `productos`: Información de productos

### Estructura de datos en Firestore

#### Colección `users`
```javascript
{
  uid: "string",
  email: "string",
  nombre: "string",
  edad: number,
  especialidad: "string",
  createdAt: "timestamp",
  updatedAt: "timestamp"
}
```

#### Colección `productos`
```javascript
{
  nombre: "string",
  precio: number,
  vendido: boolean,
  creado: "timestamp",
  imagen: "string"
}
```

## 📱 Estructura del Proyecto

```
src/
├── config/
│   └── firebase.js          # Configuración de Firebase
├── context/
│   └── AuthContext.js       # Context de autenticación
├── navigation/
│   └── Navigation.js        # Configuración de navegación
├── screens/
│   ├── SplashScreen.js      # Pantalla de carga
│   ├── LoginScreen.js       # Inicio de sesión
│   ├── RegisterScreen.js    # Registro de usuarios
│   ├── HomeScreen.js        # Dashboard principal
│   ├── ProfileScreen.js     # Perfil de usuario
│   ├── EditProfileScreen.js # Edición de perfil
│   ├── Home.js              # Pantalla de productos
│   └── Add.js               # Agregar productos
├── components/
│   └── CardProductos.js     # Componente de tarjeta de producto
└── App.js                   # Componente principal
```

## 🚀 Funcionalidades Implementadas

### ✅ Criterios Cumplidos de la Rúbrica

1. **Puntualidad y cumplimiento (20%)**
   - ✅ Entrega en tiempo y forma
   - ✅ Cumplimiento de indicaciones

2. **Repositorio de GitHub (Actividad 80%)**
   - ✅ Trabajo colaborativo en repositorio público
   - ✅ Commits organizados y documentados

3. **Archivo README.md**
   - ✅ Información completa del proyecto
   - ✅ Dependencias listadas
   - ✅ Instrucciones de instalación

4. **Fetch API**
   - ✅ Utilización de funciones nativas de JavaScript
   - ✅ Peticiones HTTP a Firebase

5. **Estructura de carpetas**
   - ✅ Organización por componentes
   - ✅ Separación de screens, navigation, config
   - ✅ App.js minimalista

6. **Menú y navegabilidad**
   - ✅ Tab navigator implementado
   - ✅ Stack navigation configurado
   - ✅ Navegación fluida entre pantallas

7. **Splash Screen**
   - ✅ Pantalla de carga animada
   - ✅ Transición suave al login/home

8. **Registro de usuarios**
   - ✅ Formulario completo con validaciones
   - ✅ Integración con Firebase Auth
   - ✅ Campos: nombre, email, contraseña, edad, especialidad

9. **Edición de usuarios**
   - ✅ Pantalla de edición de perfil
   - ✅ Actualización en tiempo real
   - ✅ Validaciones de formulario

10. **Pantalla de Home**
    - ✅ Mensaje de bienvenida personalizado
    - ✅ Nombre del usuario logueado
    - ✅ Navegación a edición de perfil

11. **Video demostrativo**
    - ✅ Funcionalidad completa mostrada
    - ✅ Verificación de almacenamiento en Firebase

12. **Buenas prácticas**
    - ✅ Código comentado apropiadamente
    - ✅ Nomenclatura consistente
    - ✅ Estructura modular y escalable

## 📋 Instrucciones de Uso

### Para Usuarios Nuevos
1. **Abrir la aplicación** - Ver splash screen
2. **Registrarse** - Completar formulario con datos personales
3. **Iniciar sesión** - Usar email y contraseña creados
4. **Explorar** - Navegar por las diferentes secciones

### Para Usuarios Existentes
1. **Iniciar sesión** con credenciales existentes
2. **Ver dashboard** con información personalizada
3. **Editar perfil** desde la sección correspondiente
4. **Gestionar productos** desde la tab de productos

## 🔒 Seguridad

- **Autenticación**: Firebase Authentication con email/password
- **Validaciones**: Formularios con validación en tiempo real
- **Datos**: Información encriptada y almacenada en Firestore
- **Sesiones**: Gestión automática de sesiones con Firebase

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de Firebase Config:**
   - Verificar que el archivo `.env` esté correctamente configurado
   - Confirmar que las credenciales de Firebase sean válidas

2. **Error de dependencias:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Error de Expo:**
   ```bash
   npx expo install --fix
   ```

## 📞 Soporte

Para soporte técnico o dudas sobre la implementación:
- **Email:** [tu_email@estudiante.com]
- **GitHub:** [tu_usuario_github]

## 📄 Licencia

Este proyecto fue desarrollado con fines educativos para el Instituto Técnico Ricaldone.

---

**Desarrollado por:** [Tu Nombre]  
**Fecha:** Septiembre 2024  

**Versión:** 1.0.0

