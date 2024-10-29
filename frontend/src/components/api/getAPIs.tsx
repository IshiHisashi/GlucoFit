import bg5sAPI from './bg5sAPI';
import { BG5SModule } from '@ihealth/ihealthlibrary-react-native';

interface Bg5sAPIs {
  getDeviceNotify: () => any;
  getDeviceAPI: () => typeof bg5sAPI;
}

const bg5sAPIWrapper: Bg5sAPIs = {
  getDeviceNotify: () => {
    return BG5SModule.Event_Notify;
  },
  getDeviceAPI: () => {
    return bg5sAPI;
  },
};

export default bg5sAPIWrapper;
