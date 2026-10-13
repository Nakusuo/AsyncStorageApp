# AsyncStorageApp

Este repositorio tiene dos versiones de la misma app: guarda un nombre en el teléfono, lo muestra al abrir la app y permite borrarlo. El dato sigue ahí aunque se cierre la app.

| Carpeta | Versión | Almacenamiento |
|---|---|---|
| [`react-native-app/`](react-native-app/) | React Native 0.87 + TypeScript | `@react-native-async-storage/async-storage` |
| raíz (`app/`) | Android nativo en Kotlin | `SharedPreferences` (el equivalente nativo) |

El código principal de la versión React Native está en [`react-native-app/App.tsx`](react-native-app/App.tsx).

## Requisitos

- Node.js 22.11 o superior
- Android Studio con el SDK de Android y un emulador (AVD), o un teléfono Android conectado con depuración USB
- JDK 17 (viene incluido con Android Studio)

## Cómo ejecutar la versión React Native

1. Clonar el repositorio y entrar a la carpeta de la app:

   ```bash
   git clone https://github.com/Nakusuo/AsyncStorageApp.git
   cd AsyncStorageApp/react-native-app
   npm install
   ```

2. Abrir el emulador desde Android Studio (**Tools > Device Manager > ▶**).

3. En una terminal, dentro de `react-native-app`, iniciar Metro:

   ```bash
   npx react-native start
   ```

4. En otra terminal, también dentro de `react-native-app`, instalar y abrir la app:

   ```bash
   npx react-native run-android
   ```

> Los comandos `npx react-native ...` deben ejecutarse **dentro de `react-native-app`**. Si se ejecutan en otra carpeta, npm muestra el error `Could not read package.json`.

## Qué probar

1. Escribir un nombre y pulsar **Guardar Nombre**. Aparece "Nombre Guardado: …".
2. Cerrar la app por completo y volver a abrirla. El nombre sigue apareciendo.
3. Pulsar **Eliminar Nombre**. Aparece "No hay datos guardados.".
4. Pulsar **Guardar Nombre** con el campo vacío. Aparece un mensaje de error.

## Métodos de AsyncStorage usados

- `AsyncStorage.setItem(key, value)` guarda un texto asociado a una clave (para un objeto, usar `JSON.stringify`).
- `AsyncStorage.getItem(key)` recupera el texto guardado (para un objeto, usar `JSON.parse`).
- `AsyncStorage.removeItem(key)` borra la clave y su valor.

La app usa la clave `@user_name`.

## Cómo ejecutar la versión nativa (Kotlin)

Abrir la carpeta raíz del repositorio en Android Studio y pulsar **Run**. Requiere Min SDK 24 (Android 7.0).
