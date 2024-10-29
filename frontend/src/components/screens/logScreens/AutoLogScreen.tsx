import { Text, View } from "@gluestack-ui/themed"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import iHealthAPI from '../../api/iHealthAPI';
import { useEffect, useState } from "react";

type AutoLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "AutoLog"
>;

const AutoLogScreen: React.FC = () => {
  const navigation = useNavigation<AutoLogScreenNavigationProps>();
  const [bluetoothState, setBluetoothState] = useState<any>(null);

  useEffect(() => {
    // Get the initial state of Bluetooth
    BluetoothStateManager.getState().then((state) => {
      setBluetoothState(state);
    });

    // Listen for changes in the Bluetooth state
    const subscription = BluetoothStateManager.onStateChange((newState) => {
      setBluetoothState(newState);
    }, true);

    // Clean up the subscription on component unmount
    return () => subscription.remove();
  }, []);

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
        <Text>
          Bluetooth is {bluetoothState === 'PoweredOn' ? 'ON' : 'OFF'}
        </Text>
      </View>
    </SafeAreaView>

  )
}

export default AutoLogScreen