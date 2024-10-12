import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
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

import PickerOpenerRow from "../../molcules/PickerOpenerRow";
import { AppStackParamList } from "../../../types/navigation";
import Sheet from "../../organisms/Sheet";

type ActivityLogScreenProps = NativeStackNavigationProp<
  AppStackParamList,
  "ActivityLog"
>;

const ActivityLogScreen: React.FC = () => {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const activities = ["Walking", "Running", "Cycling", "Others"];
  const timePeriods = ["After breakfast", "After lunch", "After dinner"];
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDurationPickerOpen, setIsDurationPickerOpen] = useState(false);
  const [isTimePeriodPickerOpen, setIsTimePeriodPickerOpen] = useState(false);

  const navigation = useNavigation<ActivityLogScreenProps>();

  const handleSave = () => {};

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
        <Button isDisabled={false} onPress={handleSave}>
          <ButtonText>Save</ButtonText>
        </Button>
      </Box>

      {/* picker modals -------------------------------------- */}

      <Actionsheet
        isOpen={isActivityPickerOpen}
        // onClose={setIsActivityPickerOpen}
        zIndex={999}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999}>
          {/* <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper> */}
          <ActionsheetItem>
            <ActionsheetItemText>here</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      <Sheet
        isOpen={isActivityPickerOpen}
        onClose={setIsActivityPickerOpen}
        setValue={setActivity}
        sheetContentType="picker"
        title="Type of activity"
        optionsArray={activities}
      />
    </View>
  );
};

export default ActivityLogScreen;
