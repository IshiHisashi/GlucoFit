import { Text, View } from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import iHealthAPI from "../../api/iHealthAPI";
import useDeviceAPI from "../../api/useDeviceAPI";
import { useEffect, useState } from "react";
import deviceAPIs from '../../api/getAPIs';

type OfflineLogsScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "OfflineLogs"
>;

type DeviceInfoProp = RouteProp<AppStackParamList, "OfflineLogs">;

type Props = {
  navigation: OfflineLogsScreenNavigationProps;
  route: DeviceInfoProp;
};

const OfflineLogsScreen: React.FC<Props> = ({ route }) => {
  const { mac } = route.params;
  const navigation = useNavigation<OfflineLogsScreenNavigationProps>();
  const { response } = useDeviceAPI();
  const [parsedRes, setParsedRes] = useState<any>();
  const [offLineData, setOffLineData] = useState<any[]>([]);
  const [datesArray, setDatesArray] = useState<string[]>([]);

  const type = "BG5S";

  iHealthAPI.sdkAuthWithLicense('com_glucofit_glucofit_ios.pem');
  const getOffLineData = Reflect.get(deviceAPIs.getDeviceAPI().apis, 'getOfflineData', mac);

  useEffect(() => {
    if (response !== null && response !== "" ) {
      const resString = response;
      const parsedObj = JSON.parse(resString);
      setParsedRes(parsedObj);
      if (parsedObj.GET_OFFLINEDATA?.history) {
        if (parsedObj.GET_OFFLINEDATA.history.length > 0) {
          setOffLineData(parsedObj.GET_OFFLINEDATA.history)
          console.log("Added offline data", parsedObj.GET_OFFLINEDATA.history);
        }
      }
    }
  }, [response])

  // Once page is loaded, it retrieves all the offline data from the device with mac number passed from AutoLogScreen.
  useEffect(() => {
    getOffLineData(mac);
  }, [])


  // useEffect(() => {


  // }, [parsedRes])


  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Offline logging"
          rightIconOnPress={() => {}}
        />
        <Text>
          Offline Logs here!
        </Text>
        <Text>{mac}</Text>
        <Text>
          {response}
        </Text>
        { offLineData.length > 0
        ?
          offLineData.map( data => {
            // If the dates array doens't contain anything (which means that this data is the first data) or data's date is different from the first date of the array, add the date to the dates array and return a date label and data.
            if (!(datesArray.length > 0) || datesArray[0] !== data.data_measure_time.slice(0, 10)) {
              datesArray.unshift(data.data_measure_time.slice(0, 10))
              return (
                <View key={data.dataID}>
                  <Text>{ datesArray[0] }</Text>
                  {
                    // show all the data from the same date under the same date label
                    offLineData.map( dataInside => {
                      if (datesArray[0] === dataInside.data_measure_time.slice(0, 10)) {
                        return (
                          <View key={dataInside.dataID}>
                            <Text>{ dataInside.data_measure_time } { Math.round(dataInside.data_value * 0.555) / 10} </Text>
                          </View>
                          
                        )
                      }
                    })
                  }
                </View>

              )
            }
            return null
          })
        :
          <Text>There is no offline data in your device. You can measure blood sugar level by going back to the previous screen.</Text>
        }
      </View>   
    </SafeAreaView>


  )
}

export default OfflineLogsScreen;