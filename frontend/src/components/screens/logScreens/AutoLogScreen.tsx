import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  Center,
  EditIcon,
  HStack,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import BluetoothStateManager from "react-native-bluetooth-state-manager";
import iHealthAPI from "../../api/iHealthAPI";
import useScanAPI from "../../api/useScanAPI";
import useConnectAPI from "../../api/useConnectAPI";
import { useEffect, useState } from "react";
import useDeviceAPI from "../../api/useDeviceAPI";
import deviceAPIs from "../../api/getAPIs";
import { Modal, StyleSheet } from "react-native";
import { Image } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";
import GlucoButton from "../../atoms/GlucoButton";
import { AnalysisCustom, EditCustom, FileCustom } from "../../svgs/svgs";
import { BlurView } from "@react-native-community/blur";
import LottieView from "lottie-react-native";

type AutoLogScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "AutoLog"
>;

const AutoLogScreen: React.FC = () => {
  const navigation = useNavigation<AutoLogScreenNavigationProps>();
  const [bluetoothState, setBluetoothState] = useState<any>(null);
  const { onScanState, isScanning, scanDevice } = useScanAPI();
  const {
    onConnectedState,
    onConnectFailState,
    onDisConnectState,
    connectDevice,
  } = useConnectAPI();
  const [scanDevices, setScanDevices] = useState<any[]>([]);
  const { response } = useDeviceAPI();
  const [parsedRes, setParsedRes] = useState<any>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [BGL, setBGL] = useState<number>();

  const type = "BG5S";

  // const startMeasuringFunc = Reflect.get(deviceAPIs.getDeviceAPI().apis, 'startMeasure', scanDevices[0].mac);

  // Authenticate with the iHealth SDK
  iHealthAPI.sdkAuthWithLicense("com_jupiter_glucofit_ios.pem");

  // Parse response from device
  useEffect(() => {
    if (response !== null && response !== "") {
      const resString = response;
      const parsedObj = JSON.parse(resString);
      setParsedRes(parsedObj);
    }
  }, [response]);

  // Bluetooth state management
  useEffect(() => {
    BluetoothStateManager.getState().then((state) => {
      setBluetoothState(state);
    });
    const subscription = BluetoothStateManager.onStateChange((newState) => {
      setBluetoothState(newState);
    }, true);
    return () => subscription.remove();
  }, []);

  // Once bluetooth is on, it start searching a device
  useEffect(() => {
    setScanDevices([]);
    scanDevice(type);
  }, [bluetoothState]);

  // Once find a device store the device in scanDevices variable
  useEffect(() => {
    if (onScanState?.mac != null) {
      setScanDevices([...scanDevices, onScanState]);
    }
  }, [onScanState]);

  // Secure the connection between the device and a phone
  useEffect(() => {
    if (scanDevices[0]?.mac != null) {
      connectDevice(scanDevices[0]?.mac, scanDevices[0]?.type);
    }
  }, [scanDevices]);

  // Once the device is connected, automatically start measuring
  useEffect(() => {
    const startMeasuringFunc = Reflect.get(
      deviceAPIs.getDeviceAPI().apis,
      "startMeasure",
      onConnectedState.mac
    );
    if (onConnectedState.mac) {
      startMeasuringFunc(onConnectedState.mac);
    }
  }, [onConnectedState]);

  // Show the modal once it gets blood and starts calculation
  useEffect(() => {
    if (
      parsedRes?.action === "ACTION_GET_BLOOD" ||
      parsedRes?.action === "ACTION_RESULT"
    ) {
      setModalVisible(true);
      if (parsedRes?.action === "ACTION_RESULT") {
        const mmolValue = Math.round(parsedRes.RESULT_VALUE * 0.555) / 10;
        setBGL(mmolValue);
      }
    }
  }, [parsedRes]);

  const moveToResult = () => {
    setModalVisible(false);
    const disconnectFunc = Reflect.get(
      deviceAPIs.getDeviceAPI().apis,
      "disConnect",
      onConnectedState.mac
    );
    disconnectFunc(onConnectedState.mac);
    navigation.navigate("GlucoseLog", {
      BGL: BGL,
      fromAuto: true,
    });
  };

  const moveToOfflineLogs = () => {
    setModalVisible(false);
    navigation.navigate("OfflineLogs", {
      mac: onConnectedState.mac,
    });
  };

  // Disconnect a device off the phone
  useEffect(() => {
    if (onConnectedState?.mac) {
      const disconnectFunc = Reflect.get(
        deviceAPIs.getDeviceAPI().apis,
        "disConnect",
        onConnectedState.mac
      );
      const unsubscribe = navigation.addListener("beforeRemove", (e) => {
        disconnectFunc(onConnectedState.mac);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [navigation, onConnectedState]);

  const moveToManualEntry = () => {
    setModalVisible(false);
    if (onConnectedState?.mac) {
      const disconnectFunc = Reflect.get(
        deviceAPIs.getDeviceAPI().apis,
        "disConnect",
        onConnectedState.mac
      );
      disconnectFunc(onConnectedState.mac);
    }
    navigation.navigate("GlucoseLog", {
      BGL: 0,
      fromAuto: false,
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View height="$full" backgroundColor="white">
        <HeaderWithBackButton
          navigation={navigation}
          text="Measure"
          // rightIconOnPress={() => {}}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View 
            height={"$full"}
            flex={1}
            justifyContent="center"
          >
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={2} 
              reducedTransparencyFallbackColor="gray"
            />
            <View
              backgroundColor="white"
              marginHorizontal={40}
              borderRadius={12}
              padding={24}
              paddingTop={0}
            >
              {parsedRes?.action === "ACTION_GET_BLOOD" ? (
                // Calculating modal
                <Center paddingTop={24}>
                  <Center
                    width={74}
                    height={74}
                    borderRadius={40}
                    backgroundColor="#FAF8FF"
                    marginBottom={16}
                    borderWidth={10}
                    borderColor="#ECE5FF"
                  >
                    <LottieView 
                      source={require("../../animations/loadingLottie.json")}
                      autoPlay
                      loop
                      style={{width: 70, height: 70}}
                    />
                  </Center>
                  <Text
                    fontSize={13} 
                    textAlign="center" 
                  >
                    Calculating your blood glucose level...
                  </Text>
                </Center>
              ) : parsedRes?.action === "ACTION_RESULT" ? (
                // Result modal
                <Center paddingTop={24}>
                  <Image
                    source={require("../../../../assets/glucoFaces/glucoSmile.png")}
                    width={100}
                    height={100}
                    marginBottom={20}
                    alt="smily face"
                  />
                  <HStack>
                    <Text
                      fontSize={22} 
                      fontFamily="$bold"
                    >
                      {BGL}
                    </Text>
                    <Text 
                      fontSize={13}
                      marginTop={9}
                      marginLeft={4}
                    >
                      mmol/L
                    </Text>
                  </HStack>
                  <Text fontSize={13}>Your blood glucose level updated.</Text>
                  <GlucoButton 
                    buttonType="primary"
                    text="Next"
                    isFocused={false}
                    isDisabled={false}
                    onPress={() => moveToResult()}
                    style={{ width: 214, height: 48, marginBottom: 12, marginTop: 20 }}
                  />
                </Center>
              ) : (
                // Error modal for measurement
                <Center marginTop={-10}>
                  <Button
                    onPress={() => setModalVisible(false)}
                    backgroundColor="transparent"
                  >
                    <ButtonText
                      position="relative" 
                      top={10} 
                      left={110}
                      padding={20}
                    >
                      ✖️
                    </ButtonText>
                  </Button>
                  <Image
                    source={require("../../../../assets/glucoFaces/glucoFrowned.png")}
                    marginBottom={20}
                    width={100}
                    height={100}
                    alt="Gluco frowned face"
                  />
                  <Text 
                    fontSize={17}
                    fontFamily="$bold"
                    textAlign="center" 
                    marginHorizontal={24} 
                    marginBottom={12}
                  >
                    Oops! We couldn't process your reading.
                  </Text>
                  <Text
                    fontSize={13} 
                    textAlign="center" 
                  >
                    The test strip may be contaminated or not have enough blood sample. Please insert a new strip and try again.
                  </Text>
                  <GlucoButton 
                    buttonType="primary"
                    text="Retry"
                    isFocused={false}
                    isDisabled={false}
                    onPress={() => setModalVisible(false)}
                    style={{ width: 214, height: 48, marginBottom: 12, marginTop: 20 }}
                  />
                </Center>
              )}
            </View>
          </View>
        </Modal>
        <View borderTopWidth={1} borderTopColor="#ECE5FF" flex={1} flexDirection="column" justifyContent="space-between">
          {parsedRes?.action === "ACTION_STRIP_IN" ||
            parsedRes?.action === "ACTION_GET_BLOOD" ||
            parsedRes?.action === "ACTION_RESULT" ? (
              // Third Screen
              <View style={styles.viewStyle}>
                <Image
                  source={require("../../../../assets/autoLogImgs/ready-to-measure.png")}
                  style={{ marginBottom: 20, width: 200, height: 200 }}
                  alt="check mark ready to measure"
                />
                <Text style={styles.regularText}>Strip is in place. </Text>
                <Text style={styles.regularText}>Waiting for your blood sample.</Text>
              </View>
            ) : bluetoothState === "PoweredOn" &&
              scanDevices[0]?.mac &&
              onConnectedState.mac ? (
              parsedRes?.action === "ACTION_STRIP_OUT" ? (
                // Strip Out Screen
                <View style={styles.viewStyle}>
                  <Image
                    source={require("../../../../assets/autoLogImgs/strip-error.png")}
                    style={{ marginBottom: 20, width: 200, height: 200 }}
                    alt="error icon"
                  />
                  <Text style={styles.regularText}>Strip is not inserted properly.</Text>
                  <Text style={styles.regularText}>Please insert it again.</Text>
                </View>
              ) : parsedRes?.action === "ACTION_ERROR_BG" &&
                parsedRes.ERROR_NUM_BG === 3 ? (
                // Strip already used Screen
                <View style={styles.viewStyle}>
                  <Image
                    source={require("../../../../assets/autoLogImgs/strip-error.png")}
                    style={{ marginBottom: 20, width: 200, height: 200 }}
                    alt="error icon"
                  />
                  <Text style={styles.regularText}>Strip is already used or unknown moisture detected.</Text>
                  <Text style={styles.regularText}>Discard the current test strip and restart the test with a new strip.</Text>
                </View>
              ) : (
                // Second Screen
                <View style={styles.viewStyle}>
                  <Image
                    source={require("../../../../assets/autoLogImgs/insert-strip.png")}
                    style={{ marginBottom: 20, width: 200, height: 200 }}
                    alt="device with strip in"
                  />
                  <Text style={styles.regularText}>
                    Insert test strip in the glucometer and prepare your blood
                    sample.
                  </Text>
                </View>
              )
            ) : (
              // First Screen
              <View style={styles.viewStyle}>
                <Image
                  source={require("../../../../assets/autoLogImgs/connect-device.png")}
                  style={{ marginBottom: 20, width: 200, height: 200 }}
                  alt="device illustration"
                />
                <Text style={styles.regularText}>
                  Make sure the bluetooth is turned on and the glucometer is nearby.
                </Text>
              </View>
          )}
          <VStack marginBottom={48} alignItems="center">
            <GlucoButton 
              buttonType="primary"
              text="Upload offline readings"
              isFocused={false}
              isDisabled={!parsedRes?.action}
              onPress={() => moveToOfflineLogs()}
              iconLeft={FileCustom}
              style={{ width: 347, height: 48, marginBottom: 12 }}
            />
            <GlucoButton 
              buttonType="secondary"
              text="Manually log your readings"
              isFocused={false}
              isDisabled={false}
              onPress={() => moveToManualEntry()}
              iconLeft={EditCustom}
              style={{ width: 347, height: 48, marginBottom: 12 }}
            />
          </VStack>
        </View>


      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'center'
  },
  buttonStyle: {
    backgroundColor: "#2089dc",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  modalViewStyle: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginHorizontal: 24,
    textAlign: "center",
    fontSize: 13,
  },
  regularText: {
    fontSize: 16,
    color: "#313131",
    marginHorizontal: 40,
    textAlign: "center"
  }
});

export default AutoLogScreen;
