import {
  AddIcon,
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
  View,
} from "@gluestack-ui/themed";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import iHealthAPI from "../../api/iHealthAPI";
import useDeviceAPI from "../../api/useDeviceAPI";
import { useContext, useEffect, useState } from "react";
import deviceAPIs from "../../api/getAPIs";
import { gql, useMutation } from "@apollo/client";
import { Modal, StyleSheet } from "react-native";
import { AuthContext } from "../../../context/AuthContext";

type OfflineLogsScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "OfflineLogs"
>;

type DeviceInfoProp = RouteProp<AppStackParamList, "OfflineLogs">;

type Props = {
  navigation: OfflineLogsScreenNavigationProps;
  route: DeviceInfoProp;
};

const CREATE_TEST_RESULT = gql`
  mutation OfflineTestResult(
    $userId: ID!
    $bsl: Float!
    $logTimestamp: Date
    $confirmed: Boolean
  ) {
    createOfflineTestResult(
      user_id: $userId
      bsl: $bsl
      log_timestamp: $logTimestamp
      confirmed: $confirmed
    )
  }
`;

const CHECK_BADGE = gql`
  mutation RewardBadgeOffline($userId: ID!) {
    rewardBadgeOffline(user_id: $userId) {
      badge_desc
      badge_name
      id
    }
  }
`;

const OfflineLogsScreen: React.FC<Props> = ({ route }) => {
  const { mac } = route.params;
  const navigation = useNavigation<OfflineLogsScreenNavigationProps>();
  const { response } = useDeviceAPI();
  const [offLineData, setOffLineData] = useState<any[]>([]);
  const [datesArray, setDatesArray] = useState<string[]>([]);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [values, setValues] = useState<string[]>([]);
  const [badgeInfo, setBadgeInfo] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { userId } = useContext(AuthContext);

  const [
    createTestResult,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation(CREATE_TEST_RESULT);

  const [
    checkBadge,
    { data: badgeData, loading: badgeLoading, error: badgeError },
  ] = useMutation(CHECK_BADGE);

  const type = "BG5S";

  iHealthAPI.sdkAuthWithLicense("com_jupiter_glucofit_ios.pem");

  const getOffLineData = Reflect.get(
    deviceAPIs.getDeviceAPI().apis,
    "getOfflineData",
    mac
  );

  // This function deletes all the offline data stored in the device. So be careful to use this.
  const deleteOfflineData = Reflect.get(
    deviceAPIs.getDeviceAPI().apis,
    "deleteOfflineData",
    mac
  );

  useEffect(() => {
    if (response !== null && response !== "") {
      const resString = response;
      const parsedObj = JSON.parse(resString);
      if (parsedObj.GET_OFFLINEDATA?.history) {
        if (parsedObj.GET_OFFLINEDATA.history.length > 0) {
          setOffLineData(parsedObj.GET_OFFLINEDATA.history);
        }
      }
    }
  }, [response]);

  // Once page is loaded, it retrieves all the offline data from the device with mac number passed from AutoLogScreen.
  useEffect(() => {
    getOffLineData(mac);
  }, []);

  const handleChange = (keys: any) => {
    setValues(keys);
    console.log(keys);
  };

  // Date info conversion function
  function formatDate(dateString: string) {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  }

  const handleSubmit = async () => {
    try {
      if (offLineData.length === 0) return;
      const getRoundedBSL = (value: number) => Math.round(value * 0.555) / 10;
      // Filter offline data
      const selectedData = offLineData.filter((data) =>
        values.includes(data.dataID)
      );
      const uploadPromises = selectedData.map((data) => {
        // Convert date time info to an ideal one
        const dateTime = new Date(data.data_measure_time);
        // Upload it
        return createTestResult({
          variables: {
            userId: userId,
            logTimestamp: dateTime,
            timePeriod: "Offline",
            bsl: getRoundedBSL(data.data_value),
            confirmed: true,
          },
        });
      });
      // All the promise happening simultanously
      const results = await Promise.all(uploadPromises);
      console.log("All test results uploaded successfully:", results);
      setModalVisible(true);

      // Once uploading is done, check if there is any badges to award
      const badges = await checkBadge({
        variables: {
          userId: userId,
        },
      });
      setBadgeInfo(badges.data.rewardBadgeOffline);
    } catch (e) {
      console.error("Error creating test result:", e);
    }
  };

  const fakeData = [
    {
      id: "670b2125cb185c3905515da2",
      badge_name: "fake badge",
      badge_desc:
        "fake description here. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda, minus eaque vero quisquam tenetur aut.",
    },
  ];

  const backToHome = () => {
    setModalVisible(false);
    const disconnectFunc = Reflect.get(
      deviceAPIs.getDeviceAPI().apis,
      "disConnect",
      mac
    );
    disconnectFunc(mac);
    // This has to be replaced with the latest version of home thingy
    navigation.navigate("Tabs", {
      screen: "Home",
      params: {
        mutatedLog: "bsl",
        insight: null,
        // badges: badgeInfo.length > 0 ? badgeInfo : fakeData,
        badges: badgeInfo,
      },
    });
  };

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Offline logging"
          rightIconOnPress={() => {}}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.viewStyle}>
                <Image
                  source={require("../../../../assets/autoLogImgs/ready-to-measure.png")}
                  style={{ width: 30, height: 30 }}
                  alt="loading"
                />
                <Text>Yout readings were successfully uploaded!</Text>
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => backToHome()}
              >
                <Text style={styles.textStyle}>Back to Home</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ScrollView scrollIndicatorInsets={false}>
          <CheckboxGroup
            value={values}
            onChange={(keys) => {
              handleChange(keys);
            }}
          >
            <View flexDirection="column" gap={20} padding={20}>
              {offLineData.length > 0 ? (
                offLineData.map((data) => {
                  // If the dates array doens't contain anything (which means that this data is the first data) or data's date is different from the first date of the array, add the date to the dates array and return a date label and data.
                  if (
                    !(datesArray.length > 0) ||
                    datesArray[0] !== data.data_measure_time.slice(0, 10)
                  ) {
                    datesArray.unshift(data.data_measure_time.slice(0, 10));
                    console.log(data.data_measure_time.slice(0, 10));
                    console.log(String(today.getMonth()).padStart(2, "0"));
                    console.log(data.data_measure_time.slice(5, 7));
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
                          String(today.getDate()).padStart(2, "0") ===
                            data.data_measure_time.slice(8, 10) &&
                          String(today.getMonth() + 1).padStart(2, "0") ===
                            data.data_measure_time.slice(5, 7) &&
                          String(today.getFullYear()) ===
                            data.data_measure_time.slice(0, 4) ? (
                            <View marginBottom={20}>
                              <Text fontSize={20} color="black">
                                Today
                              </Text>
                              <Text fontSize={12}>{datesArray[0]}</Text>
                            </View>
                          ) : // Show "Yesterday: " if it's yesterday
                          String(yesterday.getDate()).padStart(2, "0") ===
                              data.data_measure_time.slice(8, 10) &&
                            String(yesterday.getMonth() + 1).padStart(
                              2,
                              "0"
                            ) === data.data_measure_time.slice(5, 7) &&
                            String(yesterday.getFullYear()) ===
                              data.data_measure_time.slice(0, 4) ? (
                            <View marginBottom={20}>
                              <Text fontSize={20} color="black">
                                Yesterday
                              </Text>
                              <Text fontSize={12}>{datesArray[0]}</Text>
                            </View>
                          ) : (
                            // The other dates
                            <Text fontSize={20} color="black" marginBottom={20}>
                              {datesArray[0]}
                            </Text>
                          )
                        }

                        {
                          // show all the data from the same date under the same date label
                          offLineData.map((dataInside) => {
                            if (
                              datesArray[0] ===
                              dataInside.data_measure_time.slice(0, 10)
                            ) {
                              return (
                                <View
                                  key={dataInside.dataID}
                                  paddingHorizontal={10}
                                  paddingVertical={20}
                                  paddingTop={15}
                                  borderTopWidth={1}
                                  borderTopColor="lightgrey"
                                >
                                  <Checkbox value={dataInside.dataID}>
                                    <CheckboxIndicator mr="$2" bgColor="white">
                                      <CheckboxIcon as={CheckIcon} />
                                    </CheckboxIndicator>
                                    <CheckboxLabel marginTop={5}>
                                      <HStack alignItems="center" gap={10}>
                                        <Text fontSize={14} color="black">
                                          {formatDate(
                                            dataInside.data_measure_time
                                          )}
                                        </Text>
                                        <VStack>
                                          <Text
                                            fontSize={22}
                                            color="black"
                                            textAlign="right"
                                          >
                                            {Math.round(
                                              dataInside.data_value * 0.555
                                            ) / 10}
                                          </Text>
                                          <Text fontSize={12}>mmol/L</Text>
                                        </VStack>
                                      </HStack>
                                    </CheckboxLabel>
                                  </Checkbox>
                                </View>
                              );
                            }
                          })
                        }
                      </View>
                    );
                  }
                  return null;
                })
              ) : (
                <Text>
                  There is no offline data in your device. You can measure blood
                  sugar level by going back to the previous screen.
                </Text>
              )}
            </View>
          </CheckboxGroup>
        </ScrollView>
        <Button
          borderRadius={20}
          margin={20}
          isDisabled={values.length === 0}
          backgroundColor={values.length === 0 ? "$coolGray400" : "$blue600"}
          onPress={() => handleSubmit()}
        >
          <ButtonIcon as={AddIcon} />
          <ButtonText>Upload selected readings</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  viewStyle: {
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "#2089dc",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default OfflineLogsScreen;
