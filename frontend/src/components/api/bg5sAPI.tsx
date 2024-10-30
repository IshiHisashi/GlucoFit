import { BG5SModule } from "@ihealth/ihealthlibrary-react-native";

type MACAddress = string;

interface BG5SAPI {
  apis: {
    getAllConnectedDevices: () => Promise<string[]>;
    getStatusInfo: (mac: MACAddress) => Promise<any>;
    setTime: (mac: MACAddress) => Promise<void>;
    setUnit: (mac: MACAddress) => Promise<void>;
    deleteUsedStrip: (mac: MACAddress) => Promise<void>;
    deleteOfflineData: (mac: MACAddress) => Promise<void>;
    getOfflineData: (mac: MACAddress) => Promise<any>;
    startMeasure: (mac: MACAddress) => Promise<void>;
    setOfflineModel: (mac: MACAddress) => Promise<void>;
    disConnect: (mac: MACAddress) => Promise<void>;    
  }

}

const BG5SAPI: BG5SAPI = {
  apis: {
    getAllConnectedDevices: () => BG5SModule.getAllConnectedDevices(),
    getStatusInfo: (mac: MACAddress) => BG5SModule.getStatusInfo(mac),
    setTime: (mac: MACAddress) => BG5SModule.setTime(mac, 1, 1),
    setUnit: (mac: MACAddress) => BG5SModule.setUnit(mac, 1),
    deleteUsedStrip: (mac: MACAddress) => BG5SModule.deleteUsedStrip(mac),
    deleteOfflineData: (mac: MACAddress) => BG5SModule.deleteOfflineData(mac),
    getOfflineData: (mac: MACAddress) => BG5SModule.getOfflineData(mac),
    startMeasure: (mac: MACAddress) => BG5SModule.startMeasure(mac, 1),
    setOfflineModel: (mac: MACAddress) => BG5SModule.setOfflineModel(mac, 1),
    disConnect: (mac: MACAddress) => BG5SModule.disConnect(mac),    
  }

};

export default BG5SAPI;
