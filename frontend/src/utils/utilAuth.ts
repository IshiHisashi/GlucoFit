import * as SecureStore from "expo-secure-store";

// Function to save token
export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

// Function to get token
export async function getToken(key: string) {
  return await SecureStore.getItemAsync(key);
}

// Function to delete token
export async function deleteToken(key: string) {
  await SecureStore.deleteItemAsync(key);
}
