import { View } from "@gluestack-ui/themed";
import React, { FC } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";

import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { AppStackParamList } from "../../../types/navigation";

type ArticleWebViewScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "Article"
>;

const ArticleWebViewScreen: FC = () => {
  const navigation = useNavigation<ArticleWebViewScreenNavigationProps>();
  const route = useRoute();
  const { url, title } = route.params as { url: string; title: string };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithBackButton navigation={navigation} text={title} />
      <View flex={1}>
        <WebView
          source={{ uri: url }}
          style={{ flex: 1 }}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default ArticleWebViewScreen;
