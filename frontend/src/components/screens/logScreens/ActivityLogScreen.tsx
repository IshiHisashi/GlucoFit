import { View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { gql, useMutation, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { AppStackParamList } from "../../../types/navigation";
import Sheet from "../../organisms/Sheet";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import LogsTable from "../../organisms/LogsTable";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

const CREATE_ACTIVITY_LOG = gql`
  mutation CreateActivityLog(
    $userId: ID!
    $activityType: String!
    $duration: Int!
    $logTimestamp: Date
  ) {
    createActivityLog(
      user_id: $userId
      activityType: $activityType
      duration: $duration
      log_timestamp: $logTimestamp
    ) {
      id
    }
  }
`;

const GET_ACTIVITY_LOG = gql`
  query GetActivityLog($getActivityLogId: ID!) {
    getActivityLog(id: $getActivityLogId) {
      activityType
      duration
      id
      log_timestamp
    }
  }
`;

const UPDATE_ACTIVITY_LOG = gql`
  mutation UpdateActivityLog(
    $updateActivityLogId: ID!
    $activityType: String!
    $duration: Int
    $logTimestamp: Date
  ) {
    updateActivityLog(
      id: $updateActivityLogId
      activityType: $activityType
      duration: $duration
      log_timestamp: $logTimestamp
    ) {
      activityType
      duration
      id
      log_timestamp
    }
  }
`;

type ActivityLogScreenProps = NativeStackNavigationProp<
  AppStackParamList,
  "ActivityLog"
>;

type RouteParams = {
  logId?: string;
};

const ActivityLogScreen: React.FC = () => {
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();
  console.log("ROUTE ON ACT LOG:", route.params?.logId);
  const logId = route.params?.logId;

  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState({ hours: 0, minutes: 0 });
  const [timePeriod, setTimePeriod] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const activities = ["Walking", "Running", "Cycling", "Others"];
  const timePeriods = ["After breakfast", "After lunch", "After dinner"];
  const [isActivityPickerOpen, setIsActivityPickerOpen] = useState(false);
  const [isDurationPickerOpen, setIsDurationPickerOpen] = useState(false);
  const [isTimePeriodPickerOpen, setIsTimePeriodPickerOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const navigation = useNavigation<ActivityLogScreenProps>();

  const { data: existingLogData, loading: queryLoading } = useQuery(
    GET_ACTIVITY_LOG,
    {
      variables: { getActivityLogId: logId },
      skip: !logId, // Skip the query if no logId is provided
    }
  );

  const [createActivityLog] = useMutation(CREATE_ACTIVITY_LOG);
  const [updateActivityLog] = useMutation(UPDATE_ACTIVITY_LOG);

  useEffect(() => {
    if (existingLogData?.getActivityLog) {
      const log = existingLogData.getActivityLog;
      const logDate = new Date(log.log_timestamp);

      setActivity(log.activityType);

      // Convert duration (minutes) back to hours and minutes
      const hours = Math.floor(log.duration / 60);
      const minutes = log.duration % 60;
      setDuration({ hours, minutes });

      setDate(logDate);
      setTime(logDate);
    }
  }, [existingLogData]);

  const handleDateConfirm = (date: Date) => {
    setDate(date);
    setIsDatePickerOpen(false);
  };

  const handleTimeConfirm = (time: Date) => {
    setTime(time);
    setIsTimePickerOpen(false);
  };

  const handleSave = async () => {
    try {
      const combinedDateTime = new Date(date);
      combinedDateTime.setHours(
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );

      if (logId) {
        const result = await updateActivityLog({
          variables: {
            updateActivityLogId: logId,
            activityType: activity,
            duration: duration.hours * 60 + duration.minutes,
            logTimestamp: combinedDateTime,
          },
        });
        console.log("Update result:", result);
      } else {
        const log = await createActivityLog({
          variables: {
            userId: userId,
            duration: duration.hours * 60 + duration.minutes,
            logTimestamp: combinedDateTime,
            activityType: activity,
          },
        });
        console.log("Create result:", log);
      }
      navigation.navigate("Tabs", {
        screen: "Home",
        params: { mutatedLog: "activity" },
      });
    } catch (error) {
      console.error("Error creating activity log:", error);
    }
  };

  const pickerData = [
    {
      setShowPicker: setIsActivityPickerOpen,
      text: "Type of activity",
      value: activity,
    },
    {
      setShowPicker: setIsDurationPickerOpen,
      text: "Duration",
      value: duration,
    },
    { setShowPicker: setIsDatePickerOpen, text: "Date", value: date },
    { setShowPicker: setIsTimePickerOpen, text: "Time", value: time },
  ];

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Activity"
          // rightIconOnPress={() => {}}
        />

        <View p="$4" pt="$8">
          <LogsTable pickerData={pickerData} tableType="pickers" />
        </View>

        <ButtonFixedBottom
          onPress={handleSave}
          isDisabled={
            activity === "" ||
            (duration.hours === 0 && duration.minutes === 0) ||
            !date ||
            !time
          }
          text="Save"
        />

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

        <DateTimePickerModal
          isVisible={isDatePickerOpen}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setIsDatePickerOpen(false)}
          // testID="dateTimePicker"
          // date={date}
          // is24Hour={true}
          // display="default"
          // onChange={onChangeDate}
        />

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

export default ActivityLogScreen;
