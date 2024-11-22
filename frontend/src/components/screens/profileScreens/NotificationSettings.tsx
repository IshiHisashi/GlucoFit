import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  ButtonText,
  ChevronRightIcon,
  HStack,
  Center,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { Pressable } from "@gluestack-ui/themed";
import { gql, useMutation, useQuery } from "@apollo/client";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import DateInput from "../../atoms/DateInput";
import { Icon } from "@gluestack-ui/themed";
import Toggle from "../../atoms/Toggle";
import { Modal, StyleSheet } from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Image } from "@gluestack-ui/themed";

const GET_USER_NOTIF_DATA = gql`
  query GetUser($userId: ID!) {
    getUser(id: $userId) {
      notification
    }
  }
`;

const UPDATE_USER_NOTIF_DATA = gql`
  mutation UpdateUser($userId: ID!, $notification: Boolean) {
    updateUser(id: $userId, notification: $notification) {
      notification
    }
  }
`;

type NotificationSettingsScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "NotifSettings"
>;

const NotificationSettingsScreen = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<NotificationSettingsScreenNavigationProps>();
  const [notif, setNotif] = useState<boolean>();
  const [initialNotif, setInitialNotif] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { data, loading, error, refetch } = useQuery(GET_USER_NOTIF_DATA, {
    variables: { userId: userId },
    fetchPolicy: "cache-and-network",
  });
  const [updateUserNotifData] = useMutation(UPDATE_USER_NOTIF_DATA);

  useEffect(() => {
    if (data?.getUser) {
      setNotif(data.getUser.notification);

      // Set initial values for comparison
      setInitialNotif(data.getUser.notification);
    }
  }, [data]);

  useEffect(() => {
    if (notif !== null && notif !== undefined) {
      setModalVisible(!notif);
    }
  }, [notif]);

  // Update data on the screen
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleSubmit = async () => {
    try {
      const updatedData = await updateUserNotifData({
        variables: {
          userId: userId,
          notification: notif,
        },
      });
      console.log("updated data: ", updatedData);

      setInitialNotif(notif);
    } catch (e) {
      console.error("Error updating data:", e);
    }
  };

  const isChanged = notif !== initialNotif;

  return (
    <SafeAreaView backgroundColor="white">
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Edit Profile"
          // rightIconOnPress={() => {}}
        />
        <ScrollView 
          padding={20}
          borderTopColor="#ECE5FF" 
          borderTopWidth={1}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="gray"
            />
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.viewStyle}>
                  <Image
                    source={require("../../../../assets/glucoFaces/glucoFrowned.png")}
                    style={{ marginBottom: 20, width: 140, height: 140 }}
                    alt="frowned face"
                  />
                  <Text style={styles.modalText}>
                    If you turn off the notification, You won't be able to
                    recieve daily glucose log reminders anymore.
                  </Text>
                  <Text style={styles.modalText}>
                    We recommend that you keep it on so that we can help you
                    maintain your healthy habit.
                  </Text>
                </View>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <View
            flex={1}
            flexWrap="nowrap"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            padding={20}
            borderRadius={10}
            borderWidth={1}
            borderColor="#ECE5FF"
            marginBottom={20}
          >
            <Text fontSize={16} fontFamily="$semibold">
              Notifications
            </Text>
            {notif !== null && notif !== undefined && (
              <Toggle isEnabled={notif} onToggle={setNotif} />
            )}
          </View>
          {notif ? (
            <Text marginHorizontal={10} marginBottom={20}>
              You can turn off all the notifications from this app by toggling
              it off.
            </Text>
          ) : (
            <Text marginHorizontal={10} marginBottom={20}>
              You can turn on all the notifications from this app by toggling it
              on.
            </Text>
          )}
          <Button
            marginBottom={20}
            height={52}
            borderRadius={26}
            onPress={handleSubmit}
            isDisabled={!isChanged}
            backgroundColor={isChanged ? "#4800FF" : "#F2F1F5"}
          >
            <ButtonText
              fontSize={17}
              fontFamily="$bold"
              color={isChanged ? "white" : "#C2C2C2"}
            >
              Save
            </ButtonText>
          </Button>
        </ScrollView>
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
    paddingTop: 20,
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
    borderRadius: 30,
    padding: 10,
    elevation: 2,
    width: 214,
    height: 47,
    marginBottom: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#4800FF",
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

export default NotificationSettingsScreen;
