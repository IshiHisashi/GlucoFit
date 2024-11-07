import { Text, View } from "@gluestack-ui/themed"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import iHealthAPI from '../../api/iHealthAPI';
import useScanAPI from '../../api/useScanAPI';
import useConnectAPI  from '../../api/useConnectAPI';
import { useEffect, useState } from "react";

type AutoLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "AutoLog"
>;
const AutoLogScreen: React.FC = () => {
  const navigation = useNavigation<AutoLogScreenNavigationProps>();
  const [bluetoothState, setBluetoothState] = useState<any>(null);
  const {onScanState, isScanning, scanDevice} = useScanAPI();
  const {onConnectedState, onConnectFailState, onDisConnectState, connectDevice} = useConnectAPI();
  const [scanDevices, setScanDevices] = useState<any[]>([]);
  const type = "BG5S";
  // Authenticate with the iHealth SDK
  iHealthAPI.sdkAuthWithLicense('com_glucofit_glucofit_ios.pem');

  useEffect(() => {
    // Get the initial state of Bluetooth
    BluetoothStateManager.getState().then((state) => {
      setBluetoothState(state);
    });
    // Listen for changes in the Bluetooth state
    const subscription = BluetoothStateManager.onStateChange((newState) => {
      setBluetoothState(newState);
    }, true);
    // Clean up 
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    setScanDevices([]);
    scanDevice(type);
  }, [bluetoothState])

  useEffect(() => {
    if (onScanState?.mac != null) {
      setScanDevices([
        ...scanDevices,
        onScanState
      ])
    }
  }, [onScanState])


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
        <Text>
          {scanDevices[0]?.mac ? scanDevices[0].mac : "Scanning" }
        </Text>
      </View>
    </SafeAreaView>
  )
}
export default AutoLogScreen