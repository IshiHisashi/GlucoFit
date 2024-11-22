import { GluestackUIProvider } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client";
import { useFonts } from "expo-font";

import { client } from "./apollo";
import extendedConfig from "./theme.config";
import { AuthProvider } from "./src/context/AuthContext";
import RootStack from "./src/components/stacks/RootStack";

import LottieView from "lottie-react-native";
import * as SplashScreen from "expo-splash-screen";

const App: React.FC = () => {
  const [isSplashVisible, setSplashVisible] = useState<boolean>(true);
  const [fontsLoaded] = useFonts({
    "NunitoSans-Regular": require("./assets/fonts/NunitoSans_10pt-Regular.ttf"),
    "NunitoSans-Bold": require("./assets/fonts/NunitoSans_10pt-Bold.ttf"),
    "NunitoSans-SemiBold": require("./assets/fonts/NunitoSans_10pt-SemiBold.ttf"),
  });

  useEffect(() => {
    const prepareApp = async () => {
      if (!fontsLoaded) return;

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSplashVisible(false);
      SplashScreen.hideAsync();
    };

    prepareApp();
  }, [fontsLoaded, isSplashVisible]);

  if (!fontsLoaded || isSplashVisible) {
    return (
      <SafeAreaProvider>
        <LottieView
          source={require("./src/components/animations/logo-animation.json")}
          autoPlay
          speed={1.2}
          loop={true}
          style={{ flex: 1, backgroundColor: "#4800FF" }}
        />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={extendedConfig}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <RootStack />
          </AuthProvider>
        </ApolloProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
