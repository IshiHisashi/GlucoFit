import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import { iHealthDeviceManagerModule } from '@ihealth/ihealthlibrary-react-native';
const TAG = 'iHealthAPI';
interface AuthenticateEvent {
  [key: string]: any;
}
const sdkAuthWithLicense = (filename: string): void => {
  const authenListener: EmitterSubscription = DeviceEventEmitter.addListener(
    iHealthDeviceManagerModule.Event_Authenticate_Result,
    (event: AuthenticateEvent) => {
      console.log(`${TAG} ${JSON.stringify(event)}`);
    }
  );
  iHealthDeviceManagerModule.sdkAuthWithLicense(filename);
};
export default {
  sdkAuthWithLicense,
};