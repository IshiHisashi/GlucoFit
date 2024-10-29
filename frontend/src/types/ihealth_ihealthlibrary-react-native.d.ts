declare module '@ihealth/ihealthlibrary-react-native' {

  export const BG5SModule: {
    getAllConnectedDevices: () => Promise<string[]>;
    getStatusInfo: (mac: string) => Promise<any>;
    setTime: (mac: string, param1: number, param2: number) => Promise<any>;
    setUnit: (mac: string, unit: number) => Promise<any>;
    deleteUsedStrip: (mac: string) => Promise<any>;
    deleteOfflineData: (mac: string) => Promise<any>;
    getOfflineData: (mac: string) => Promise<any>;
    startMeasure: (mac: string, param: number) => Promise<any>;
    setOfflineModel: (mac: string, model: number) => Promise<any>;
    disConnect: (mac: string) => Promise<any>;
    Event_Notify?: any;
  };

  export const iHealthDeviceManagerModule: {
    Event_Authenticate_Result: any;
    sdkAuthWithLicense: (filename: string) => any;
    connectDevice: (mac: string, type: string) => any;
    Event_Device_Connected: any;
    Event_Device_Connect_Failed: any;
    Event_Device_Disconnect: any;
    startDiscovery: (type: string) => any;
    Event_Scan_Device: any;
    Event_Scan_Finish: any;
  };
}
