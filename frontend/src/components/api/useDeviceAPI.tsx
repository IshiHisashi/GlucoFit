import { useState, useEffect } from 'react';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import deviceAPIs from '../api/getAPIs';
const useDeviceAPI = () => {
    const [response, setResponse] = useState<string>("");
    useEffect(() => {
        const notifyEvent: string = deviceAPIs.getDeviceNotify();
        const notifyListener: EmitterSubscription = DeviceEventEmitter.addListener(notifyEvent, (event: any) => {
            console.log(event);
            setResponse(JSON.stringify(event));
        });
        return () => {
            notifyListener.remove();
        };
    }, []);
        
    return {
        response
    };
}
export default useDeviceAPI;