import { AddIcon, Button, ButtonIcon, ButtonText, CheckIcon, Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel, HStack, ScrollView, Text, VStack, View } from "@gluestack-ui/themed";
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
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [values, setValues] = useState<string[]>([])

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
        }
      }
    }
  }, [response])

  // Once page is loaded, it retrieves all the offline data from the device with mac number passed from AutoLogScreen.
  useEffect(() => {
    getOffLineData(mac);
  }, [])

  const testFunc = (keys: any) => {
    setValues(keys);
    console.log(keys);
  }

  // Date info conversion function
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    };
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
  
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    return `${formattedDate}, ${formattedTime}`;
  }

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Offline logging"
          rightIconOnPress={() => {}}
        />
        <ScrollView scrollIndicatorInsets={false}>
          <CheckboxGroup
            value={values}
            onChange={(keys) => {
              testFunc(keys);
            }}
          >
            <View flexDirection="column" gap={20} padding={20}>
              { offLineData.length > 0
              ?
                offLineData.map( data => {
                  // If the dates array doens't contain anything (which means that this data is the first data) or data's date is different from the first date of the array, add the date to the dates array and return a date label and data.
                  if (!(datesArray.length > 0) || datesArray[0] !== data.data_measure_time.slice(0, 10)) {
                    datesArray.unshift(data.data_measure_time.slice(0, 10))
                    console.log(data.data_measure_time.slice(0, 10))
                    console.log(String(today.getMonth()).padStart(2, '0'))
                    console.log(data.data_measure_time.slice(5, 7))
                    return (
                      <View 
                        key={data.dataID} 
                        borderColor="#ccc"
                        borderWidth={1}
                        rounded={10}
                        paddingTop={20}
                        paddingHorizontal={16}
                        flexDirection="column"
                      >
                        { 
                          // Show "Today: " if it's today
                          String(today.getDate()).padStart(2, '0') === data.data_measure_time.slice(8, 10) && String(today.getMonth()+1).padStart(2, '0') === data.data_measure_time.slice(5, 7) && String(today.getFullYear()) === data.data_measure_time.slice(0, 4) ? 
                            <View marginBottom={20}>
                              <Text fontSize={20} color="black">Today</Text> 
                              <Text fontSize={12}>{ datesArray[0] }</Text>                            
                            </View>
                          :
                            // Show "Yesterday: " if it's yesterday
                            String(yesterday.getDate()).padStart(2, '0') === data.data_measure_time.slice(8, 10) && String(yesterday.getMonth()+1).padStart(2, '0') === data.data_measure_time.slice(5, 7) && String(yesterday.getFullYear()) === data.data_measure_time.slice(0, 4) ? 
                              <View marginBottom={20}>
                                <Text fontSize={20} color="black">Yesterday</Text> 
                                <Text fontSize={12}>{ datesArray[0] }</Text>                            
                              </View>
                            : 
                              // The other dates
                              <Text fontSize={20} color="black" marginBottom={20}>{ datesArray[0] }</Text>
                        }
                        
                        {
                          // show all the data from the same date under the same date label
                          offLineData.map( dataInside => {
                            if (datesArray[0] === dataInside.data_measure_time.slice(0, 10)) {
                              return (
                                <View key={dataInside.dataID} paddingHorizontal={10} paddingVertical={20} paddingTop={15} borderTopWidth={1} borderTopColor="lightgrey">
                                  <Checkbox value={dataInside.dataID}>
                                    <CheckboxIndicator mr="$2" bgColor="white">
                                      <CheckboxIcon as={CheckIcon} />
                                    </CheckboxIndicator>
                                    <CheckboxLabel marginTop={5}>
                                      <HStack alignItems="center" gap={10}>
                                        <Text fontSize={14} color="black">
                                          { formatDate(dataInside.data_measure_time) }
                                        </Text>
                                        <VStack>
                                          <Text fontSize={22} color="black" textAlign="right">
                                            { Math.round(dataInside.data_value * 0.555) / 10} 
                                          </Text>
                                          <Text fontSize={12}>
                                            mmol/L
                                          </Text>
                                        </VStack>                                        
                                      </HStack>
                                    </CheckboxLabel>                                
                                  </Checkbox>
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
          </CheckboxGroup>          
        </ScrollView>
        <Button 
          borderRadius={20} 
          margin={20} 
          isDisabled={values.length === 0}
          backgroundColor={values.length === 0 ? "$coolGray400" : "$blue600" }
        >
          <ButtonIcon as={AddIcon} />
          <ButtonText>
            Upload selected readings
          </ButtonText>
        </Button>
      </View>   
    </SafeAreaView>
  )
}
export default OfflineLogsScreen;