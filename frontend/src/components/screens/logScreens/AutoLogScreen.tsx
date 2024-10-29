import { Text, View } from "@gluestack-ui/themed"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";

type AutoLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "AutoLog"
>;

const AutoLogScreen: React.FC = () => {
  const navigation = useNavigation<AutoLogScreenNavigationProps>();

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Log automatically"
          rightIconOnPress={() => {}}
        />
        <Text>
          This is Auto Log Screen.
        </Text>
      </View>
    </SafeAreaView>

  )
}

export default AutoLogScreen