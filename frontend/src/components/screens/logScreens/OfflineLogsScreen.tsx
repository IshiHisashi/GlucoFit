import { Text, View } from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";

type OfflineLogsScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "OfflineLogs"
>;

type DeviceInfoProp = RouteProp<AppStackParamList, "OfflineLogs">;

type Props = {
  navigation: OfflineLogsScreenNavigationProps;
  route: DeviceInfoProp;
};

const OfflineLogsScreen: React.FC<Props> = ({ route }) => {
  const { mac } = route.params;
  const navigation = useNavigation<OfflineLogsScreenNavigationProps>();

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Offline logging"
          rightIconOnPress={() => {}}
        />
        <Text>
          Offline Logs here!
        </Text>
        <Text>{mac}</Text>
      </View>   
    </SafeAreaView>


  )
}

export default OfflineLogsScreen;