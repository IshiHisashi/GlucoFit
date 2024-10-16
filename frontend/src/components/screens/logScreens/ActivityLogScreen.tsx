import {
  Box,
  Button,
  ButtonText,
  Center,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

import PickerOpenerRow from "../../molcules/PickerOpenerRow";
import { AppStackParamList } from "../../../types/navigation";
import Sheet from "../../organisms/Sheet";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

const CREATE_ACTIVITY_LOG = gql`
  mutation CreateActivityLog(
    $userId: ID!
    $duration: Int!
    $logTimestamp: Date!
    $timePeriod: String
  ) {
    createActivityLog(
      user_id: $userId
      duration: $duration
      log_timestamp: $logTimestamp
      time_period: $timePeriod
    ) {
      duration
      log_timestamp
      time_period
    }
  }
`;

type ActivityLogScreenProps = NativeStackNavigationProp<
  AppStackParamList,
  "ActivityLog"
>;

const ActivityLogScreen: React.FC = () => {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });
  const [timePeriod, setTimePeriod] = useState("");
  const activities = ["Walking", "Running", "Cycling", "Others"];
  const timePeriods = ["After breakfast", "After lunch", "After dinner"];
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDurationPickerOpen, setIsDurationPickerOpen] = useState(false);
  const [isTimePeriodPickerOpen, setIsTimePeriodPickerOpen] = useState(false);

  const navigation = useNavigation<ActivityLogScreenProps>();

  const [createActivityLog, { data, loading, error }] =
    useMutation(CREATE_ACTIVITY_LOG);

  const handleSave = async () => {
    try {
      const log = await createActivityLog({
        variables: {
          userId: userId,
          duration: duration.hours * 60 + duration.minutes,
          logTimestamp: new Date(),
          timePeriod: timePeriod,
        },
      });
      console.log("Mutation result:", log);
      navigation.navigate("Tabs", {
        screen: "Home",
        params: { mutatedLog: "activity" },
      });
    } catch (error) {
      console.error("Error creating activity log:", error);
    }
  };

  return (
    <View height="$full">
      <VStack space="md" p="$4">
        <PickerOpenerRow
          setShowPicker={setIsActivityPickerOpen}
          text="Type of activity"
          value={activity}
          independent
        />
        <PickerOpenerRow
          setShowPicker={setIsDurationPickerOpen}
          text="Duration"
          value={duration}
          independent
        />
        <PickerOpenerRow
          setShowPicker={setIsTimePeriodPickerOpen}
          text="Time period"
          value={timePeriod}
          independent
        />
      </VStack>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p="$4"
        pb="$8"
        bg="$white"
      >
        <Button
          isDisabled={
            activity === "" ||
            (duration.hours === 0 && duration.minutes === 0) ||
            timePeriod === ""
          }
          onPress={handleSave}
        >
          <ButtonText>Save</ButtonText>
        </Button>
      </Box>

      {/* picker modals -------------------------------------- */}

      <Sheet
        isOpen={isActivityPickerOpen}
        onClose={setIsActivityPickerOpen}
        setValue={setActivity}
        sheetContentType="picker"
        title="Type of activity"
        optionsArray={activities}
        value={activity}
      />

      <Sheet
        isOpen={isDurationPickerOpen}
        onClose={setIsDurationPickerOpen}
        setValue={setDuration}
        sheetContentType="duration"
        title="Pick activity duration"
        value={duration}
      />

      <Sheet
        isOpen={isTimePeriodPickerOpen}
        onClose={setIsTimePeriodPickerOpen}
        setValue={setTimePeriod}
        sheetContentType="picker"
        title="Pick time period"
        optionsArray={timePeriods}
        value={timePeriod}
      />
    </View>
  );
};

export default ActivityLogScreen;
