import { AddIcon, Button, ButtonIcon, ButtonText, Text, View } from "@gluestack-ui/themed"
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
import useDeviceAPI from "../../api/useDeviceAPI";
import deviceAPIs from '../../api/getAPIs';
import { Modal, StyleSheet } from "react-native";
import { Image } from "@gluestack-ui/themed";
import { Pressable } from "@gluestack-ui/themed";

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
  const { response } = useDeviceAPI();
  const [parsedRes, setParsedRes] = useState<any>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [BGL, setBGL] = useState<number>();

  const type = "BG5S";

  // const startMeasuringFunc = Reflect.get(deviceAPIs.getDeviceAPI().apis, 'startMeasure', scanDevices[0].mac);

  // Authenticate with the iHealth SDK
  iHealthAPI.sdkAuthWithLicense('com_glucofit_glucofit_ios.pem');

  // Parse response from device
  useEffect(() => {
    if (response !== null && response !== "" ) {
      const resString = response;
      const parsedObj = JSON.parse(resString);
      setParsedRes(parsedObj);
    }
  }, [response])

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
  }, [bluetoothState])

  // Once find a device store the device in scanDevices variable
  useEffect(() => {
    if (onScanState?.mac != null) {
      setScanDevices([
        ...scanDevices,
        onScanState
      ])
    }
  }, [onScanState])

  // Secure the connection between the device and a phone
  useEffect(() => {
    if (scanDevices[0]?.mac != null) {
      connectDevice(scanDevices[0]?.mac, scanDevices[0]?.type)
    }
  }, [scanDevices])

  // Once the device is connected, automatically start measuring
  useEffect(() => {
    const startMeasuringFunc = Reflect.get(deviceAPIs.getDeviceAPI().apis, 'startMeasure', onConnectedState.mac);
    if (onConnectedState.mac) {
      startMeasuringFunc(onConnectedState.mac);
    }
  }, [onConnectedState])

  // Show the modal once it gets blood and starts calculation
  useEffect(() => {
    if (parsedRes?.action === 'ACTION_GET_BLOOD' || parsedRes?.action === 'ACTION_RESULT') {
      setModalVisible(true);
      if (parsedRes?.action === 'ACTION_RESULT') {
        const mmolValue = Math.round(parsedRes.RESULT_VALUE * 0.555) / 10
        setBGL(mmolValue);
      }
    }
  }, [parsedRes])

  const moveToResult = () => {
    setModalVisible(false)
    navigation.navigate("GlucoseLog",{
      BGL: BGL,
      fromAuto: true
    });
  }

  const moveToManualEntry = () => {
    setModalVisible(false)
    navigation.navigate("GlucoseLog",{
      BGL: 0,
      fromAuto: false
    });
  }


  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Log automatically"
          rightIconOnPress={() => {}}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              { parsedRes?.action === 'ACTION_GET_BLOOD' ? 
                // Calculating modal
                <View style={styles.viewStyle}>
                  <Image 
                    source={require('../../../../assets/autoLogImgs/loading.png')}
                    style={{width: 30, height: 30}}
                    alt="loading"
                  />
                  <Text>
                    Calculating your blood glucose level...
                  </Text>
                </View>
              : 
              parsedRes?.action === 'ACTION_RESULT' ? 
                  // Result modal
                  <View style={styles.viewStyle}>
                    <Image 
                      source={require('../../../../assets/autoLogImgs/gluco-chan.png')}
                      style={{width: 44, height: 40}}
                      alt="smiling emoji"
                    />
                    <Text>
                      { BGL } mmol/L
                    </Text>
                    <Text style={styles.modalText}>
                      Updating your reading...
                    </Text>                  
                  </View>
                :
                  // Error modal for measurement
                  <View style={styles.viewStyle}>
                    <Image 
                      source={require('../../../../assets/autoLogImgs/error-measure.png')}
                      style={{width: 30, height: 30}}
                      alt="error warning"
                    />
                    <Text>
                      Oops! We couldn't process your reading.The test strip may be contaminated or not have enough blood sample. Please try again.
                    </Text>
                  </View>
              }
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => moveToResult()}>
                <Text style={styles.textStyle}>Next</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        { parsedRes?.action === 'ACTION_STRIP_IN' || parsedRes?.action === 'ACTION_GET_BLOOD' || parsedRes?.action === 'ACTION_RESULT' ?
          // Third Screen
          <View style={styles.viewStyle}>
            <Image 
              source={require('../../../../assets/autoLogImgs/ready-to-measure.png')}
              style={{width: 200, height: 200}}
              alt="check mark ready to measure"
            />
            <Text>
              Strip is in place. Waiting for your blood sample.
            </Text>
          </View>
        :
          bluetoothState === 'PoweredOn' && scanDevices[0]?.mac && onConnectedState.mac ?
            parsedRes?.action === 'ACTION_STRIP_OUT' ? 
              // Strip Out Screen
              <View style={styles.viewStyle}>
                <Image 
                  source={require('../../../../assets/autoLogImgs/strip-error.png')}
                  style={{width: 200, height: 200}}
                  alt="error wrning"
                />
                <Text>
                  Strip is not inserted properly.
                </Text>
                <Text>
                  Please insert it again.
                </Text>
              </View>
            :
              parsedRes?.action === 'ACTION_ERROR_BG' && parsedRes.ERROR_NUM_BG === 3 ?
                // Strip already used Screen
                <View style={styles.viewStyle}>
                  <Image 
                    source={require('../../../../assets/autoLogImgs/strip-error.png')}
                    style={{width: 200, height: 200}}
                    alt="error warning"
                  />
                  <Text>
                    Strip is already used or unknown moisture detected, discard the test strip and repeat the test with a new strip.
                  </Text>
                </View>
              :
                // Second Screen
                <View style={styles.viewStyle}>
                  <Image 
                    source={require('../../../../assets/autoLogImgs/insert-strip.png')}
                    style={{width: 200, height: 200}}
                    alt="device with strip in"
                  />
                  <Text>
                    Insert test strip in the glucometer and prepare your blood sample.
                  </Text>   
                </View>
          :
            // First Screen
            <View style={styles.viewStyle}>
              <Image 
                source={require('../../../../assets/autoLogImgs/connect-device.png')}
                style={{width: 200, height: 200}}
                alt="device illustration"
              />
              <Text>
                Make sure the bluetooth is turned on and the glucometer is nearby.
              </Text>  
            </View>
        }
        <Text>
          { parsedRes?.action }
          { parsedRes?.RESULT_VALUE }
        </Text>
        <Button
          size="md"
          variant="outline"
          marginHorizontal={20}
          borderRadius={20}
          onPress={() => moveToManualEntry()}
        >
          <ButtonText>Manually log your readings</ButtonText>
          <ButtonIcon as={AddIcon} />
        </Button>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  viewStyle: {
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#2089dc',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default AutoLogScreen