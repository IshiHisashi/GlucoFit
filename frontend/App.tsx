import { GluestackUIProvider } from "@gluestack-ui/themed";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { config } from "@gluestack-ui/config";
import { ApolloProvider } from "@apollo/client";

import Test from "./src/components/testPages/Test";
import AppStack from "./src/components/stacks/AppStack";
import { client } from "./apollo";

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <ApolloProvider client={client}>
          <StatusBar style="auto" />
          <AppStack />
        </ApolloProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
