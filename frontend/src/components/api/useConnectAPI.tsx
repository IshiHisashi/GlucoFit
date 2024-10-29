import { useState, useEffect } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';

interface EventData {
  [key: string]: any; // Adjust the type based on the specific event structure if known
}

const useConnectAPI = () => {
  const [onConnectedState, setConnectedState] = useState<EventData>({});
  const [onConnectFailState, setConnectFailState] = useState<EventData>({});
  const [onDisConnectState, setDisConnectState] = useState<EventData>({});

  const connectDevice = (mac: string, type: string) => {
    console.log("connect device: ", mac, type);
    iHealthDeviceManagerModule.connectDevice(mac, type);
  };

  useEffect(() => {
    const connectedListener: EmitterSubscription = DeviceEventEmitter.addListener(
      iHealthDeviceManagerModule.Event_Device_Connected,
      (event: EventData) => {
        console.log(iHealthDeviceManagerModule.Event_Device_Connected, event);
        setConnectedState(event);
      }
    );

    const connectFailListener: EmitterSubscription = DeviceEventEmitter.addListener(
      iHealthDeviceManagerModule.Event_Device_Connect_Failed,
      (event: EventData) => {
        console.log(iHealthDeviceManagerModule.Event_Device_Connect_Failed, event);
        setConnectFailState(event);
      }
    );

    const disconnectListener: EmitterSubscription = DeviceEventEmitter.addListener(
      iHealthDeviceManagerModule.Event_Device_Disconnect,
      (event: EventData) => {
        console.log(iHealthDeviceManagerModule.Event_Device_Disconnect, event);
        setDisConnectState(event);
      }
    );

    return () => {
      connectedListener.remove();
      connectFailListener.remove();
      disconnectListener.remove();
    };
  }, []);

  return {
    connectDevice,
    onConnectedState,
    onConnectFailState,
    onDisConnectState,
  };
};

export default useConnectAPI;
