import { Platform } from 'react-native';
import Constants from 'expo-constants';

// EXPO_PUBLIC_API_BASE_URL can be set in your shell or in app.json via `extra` + env substitution.
// Example: EXPO_PUBLIC_API_BASE_URL=https://your-api.example.com

const DEFAULT_PORT = '3000';

function deriveHostFromExpo(): string | undefined {
  try {
    // Works in Expo Go / dev: hostUri like "192.168.1.10:8081" or "localhost:19000"
    const hostUri = (Constants as any)?.expoConfig?.hostUri as string | undefined;
    if (hostUri) {
      return hostUri.split(':')[0];
    }
  } catch {}
  return undefined;
}

export const API_BASE_URL: string = (() => {
  const extraUrl = (Constants as any)?.expoConfig?.extra?.apiBaseUrl as string | undefined;
  if (extraUrl && extraUrl.length > 0) {
    return extraUrl;
  }

  const envUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (envUrl && envUrl.length > 0) {
    return envUrl;
  }

  const derivedHost = deriveHostFromExpo();
  if (derivedHost) {
    return `http://${derivedHost}:${DEFAULT_PORT}`;
  }

  // Fallbacks: emulator / simulators / localhost
  if (Platform.OS === 'android') {
    // Android emulator
    return `http://10.0.2.2:${DEFAULT_PORT}`;
  }

  // iOS simulator or web
  return `http://localhost:${DEFAULT_PORT}`;
})();

export function buildApiUrl(path: string): string {
  if (!path.startsWith('/')) return `${API_BASE_URL}/${path}`;
  return `${API_BASE_URL}${path}`;
}


