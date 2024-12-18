import { useState, useEffect } from "react";
import { DeviceEventEmitter, EmitterSubscription } from "react-native";
import { iHealthDeviceManagerModule } from "@ihealth/ihealthlibrary-react-native";
interface ScanEvent {
  mac: string;
  name: string;
}
const useScanAPI = () => {
  const [onScanState, setOnScanState] = useState<ScanEvent | null>(null);
  const [isScanning, setScanning] = useState<boolean>(false);
  const scanDevice = (type: string) => {
    console.log("scan device: " + type);
    setScanning(true);
    iHealthDeviceManagerModule.startDiscovery(type);
  };
  useEffect(() => {
    const scanListener: EmitterSubscription = DeviceEventEmitter.addListener(
      iHealthDeviceManagerModule.Event_Scan_Device,
      (event: ScanEvent) => {
        console.log(event);
        setOnScanState(event);
      }
    );
    const scanFinishListener: EmitterSubscription =
      DeviceEventEmitter.addListener(
        iHealthDeviceManagerModule.Event_Scan_Finish,
        () => {
          setScanning(false);
        }
      );
    return () => {
      scanListener.remove();
      scanFinishListener.remove();
    };
  }, []);

  return {
    onScanState,
    isScanning,
    scanDevice,
  };
};
export default useScanAPI;
