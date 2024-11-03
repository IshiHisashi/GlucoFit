import { GluestackUIProvider } from "@gluestack-ui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
// import { config } from "@gluestack-ui/config";
import { ApolloProvider } from "@apollo/client";
import { useFonts } from "expo-font";

import { client } from "./apollo";
import Test from "./src/components/testPages/Test";
import AppStack from "./src/components/stacks/AppStack";
import extendedConfig from "./theme.config";
import { AuthProvider } from "./src/context/AuthContext";
import RootStack from "./src/components/stacks/RootStack";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "NunitoSans-Regular": require("./assets/fonts/NunitoSans_10pt-Regular.ttf"),
    "NunitoSans-Bold": require("./assets/fonts/NunitoSans_10pt-Bold.ttf"),
    "NunitoSans-SemiBold": require("./assets/fonts/NunitoSans_10pt-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={extendedConfig}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <RootStack />
            {/* <StatusBar style="auto" /> */}
            {/* <AppStack /> */}
          </AuthProvider>
        </ApolloProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
