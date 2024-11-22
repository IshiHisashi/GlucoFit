import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../types/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import PressableOption from "../../atoms/PressableOption";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { Dimensions } from "react-native";
import InputFieldGeneral from "../../atoms/InputFieldGeneral";
import LogsTable from "../../organisms/LogsTable";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CREATE_NEW_MEDICINE = gql`
  mutation AddMedicineToList(
    $userId: ID!
    $medicineName: String!
    $dosage: String
    $unit: String
    $logTimestamp: Date
  ) {
    addMedicineToList(
      user_id: $userId
      medicine_name: $medicineName
      dosage: $dosage
      unit: $unit
      log_timestamp: $logTimestamp
    ) {
      id
      medicine_name
      log_timestamp
      dosage
      unit
    }
  }
`;

type AddMedecineScreenNavigationProps = NativeStackNavigationProp<
  AppStackParamList,
  "AddMedecine"
>;

const AddMedecineScreen = () => {
  const { userId } = useContext(AuthContext);
  const navigation = useNavigation<AddMedecineScreenNavigationProps>();
  const [medName, setMedName] = useState<string>("");
  const [dosage, setDosage] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [time, setTime] = useState(new Date());
  const [initialTime, setInitialTime] = useState(new Date());
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const [createNewMedicine] = useMutation(CREATE_NEW_MEDICINE);

  const handleSubmit = async () => {
    try {
      const newMed = await createNewMedicine({
        variables: {
          userId: userId,
          medicineName: medName,
          dosage: dosage,
          unit: unit,
          logTimestamp: time.toISOString,
        },
      });
      console.log("Created a new medicine data: ", newMed);

      navigation?.navigate("Medications");
    } catch (e) {
      console.error("Error updating health data:", e);
    }
  };

  const handleUnitChange = (type: string) => {
    setUnit(type);
  };

  const handleTimeConfirm = (time: Date) => {
    setTime(time);
    setIsTimePickerOpen(false);
  };

  const pickerData = [
    {
      setShowPicker: setIsTimePickerOpen,
      text: "Time",
      value: time.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
    },
  ];

  const isReady =
    medName !== "initialDiabetesType" &&
    dosage !== "" &&
    unit !== "" &&
    time !== initialTime;

  useEffect(() => {
    console.log(time);
  }, [time]);
  return (
    <SafeAreaView backgroundColor="white">
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Health Data"
          // rightIconOnPress={() => {}}
        />
        <ScrollView 
          padding={20} 
          borderTopColor="#ECE5FF" 
          borderTopWidth={1}
        >
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Medicine Name"
              value={medName}
              onChangeText={setMedName}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              placeholder="ex) Insuline"
            />
          </View>
          <View marginBottom={20}>
            <InputFieldGeneral
              label="Dosage"
              value={dosage}
              onChangeText={setDosage}
              isRequired={false}
              isDisabled={false}
              isInvalid={false}
              keyboardType="numeric"
              placeholder="ex) 10"
            />
          </View>
          <Text
            fontSize={14}
            color="black"
            fontFamily="$bold"
            marginBottom={10}
          >
            Dosage Unit
          </Text>
          <View flexDirection="row" flexWrap="nowrap" gap={10}>
            <View flexBasis={22} flexGrow={1}>
              <PressableOption
                selectedOption={unit}
                onSelect={handleUnitChange}
                value="mcg"
                label="mcg"
                withoutCheck
                needOutLine
              />
            </View>
            <View flexBasis={22} flexGrow={1}>
              <PressableOption
                selectedOption={unit}
                onSelect={handleUnitChange}
                value="mg"
                label="mg"
                withoutCheck
                needOutLine
              />
            </View>
            <View flexBasis={22} flexGrow={1}>
              <PressableOption
                selectedOption={unit}
                onSelect={handleUnitChange}
                value="mL"
                label="mL"
                withoutCheck
                needOutLine
              />
            </View>
            <View flexBasis={22} flexGrow={1}>
              <PressableOption
                selectedOption={unit}
                onSelect={handleUnitChange}
                value="pill"
                label="pill"
                withoutCheck
                needOutLine
              />
            </View>
          </View>
          <View marginTop={20}>
            <LogsTable pickerData={pickerData} tableType="pickers" />
          </View>
          <Button
            onPress={handleSubmit}
            isDisabled={!isReady}
            marginTop={20}
            borderRadius={30}
            height={52}
            backgroundColor={isReady ? "#4800FF" : "#F2F1F5"}
          >
            <ButtonText fontSize={17} fontFamily="$bold" color={isReady ? "white" : "#C2C2C2"}>Save</ButtonText>
          </Button>
        </ScrollView>

        {/* modal for time picker */}
        <DateTimePickerModal
          isVisible={isTimePickerOpen}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerOpen(false)}
          // testID="dateTimePicker"
          // time={time}
          is24Hour={true}
          // display="default"
          // onChange={onChangeTime}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddMedecineScreen;
