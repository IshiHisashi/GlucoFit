import { GluestackUIProvider } from "@gluestack-ui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { config } from "@gluestack-ui/config";

import Test from "./src/components/testPages/Test";
import AppStack from "./src/components/stacks/AppStack";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <StatusBar style="auto" />
        <AppStack />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
