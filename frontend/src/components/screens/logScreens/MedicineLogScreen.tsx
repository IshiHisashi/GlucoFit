import { ScrollView, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppStackParamList } from "../../../types/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import ButtonFixedBottom from "../../molcules/ButtonFixedBottom";
import { HeaderWithBackButton } from "../../headers/HeaderWithBackButton";
import LogsTable from "../../organisms/LogsTable";

// hardcode for now
const userId = "670de7a6e96ff53059a49ba8";

// dummy data
const medicines = [
  { name: "Apotokishin", dosage: 16, unit: "mg", frequency: "Everyday" },
  { name: "Kakkonto", dosage: 18, unit: "mg", frequency: "Everyday" },
];

const GET_MEDICINES_LIST = gql`
  query GetMedicinesList($userId: ID!) {
    getUserMedicineList(user_id: $userId) {
      dosage
      id
      medicine_name
      unit
    }
  }
`;

const CREATE_MEDICINE_LOG = gql`
  mutation CreateMedicineLog(
    $userId: ID!
    $medicineId: ID!
    $amount: Float!
    $logTimestamp: Date!
  ) {
    createMedicineLog(
      user_id: $userId
      medicine_id: $medicineId
      amount: $amount
      log_timestamp: $logTimestamp
    ) {
      amount
      log_timestamp
      medicine_id {
        medicine_name
        id
      }
    }
  }
`;

type MedicineLogScreenProps = NativeStackNavigationProp<
  AppStackParamList,
  "MedicineLog"
>;

type RouteParams = {
  logId?: string;
};

const MedicineLogScreen: React.FC = () => {
  const [selectedMeds, setSelectedMeds] = useState<
    { id: string; dosage: number }[]
  >([]);

  const navigation = useNavigation<MedicineLogScreenProps>();
  const route = useRoute<{ key: string; name: string; params: RouteParams }>();
  console.log("ROUTE ON MED LOG:", route.params.logId);

  const {
    data: medsListData,
    loading: medsListLoading,
    error: medsListError,
  } = useQuery(GET_MEDICINES_LIST, {
    variables: { userId },
  });
  // medsListData && console.log("meds:", medsListData.getUserMedicineList);
  const medicinesData = medsListData?.getUserMedicineList.map((obj) => {
    return {
      ...obj,
      isSelected: selectedMeds.some((med) => med.id === obj.id),
      onPressMedicine: () => toggleMedSelection(obj.id, obj.dosage),
    };
  });

  const [createMedicineLog, { data, loading, error }] =
    useMutation(CREATE_MEDICINE_LOG);

  const toggleMedSelection = (id: string, dosage: number) => {
    setSelectedMeds((prev) => {
      const isSelected = prev.some((med) => med.id === id);
      if (isSelected) {
        return prev.filter((med) => med.id !== id);
      } else {
        return [...prev, { id, dosage }];
      }
    });
  };

  const handleSave = async () => {
    console.log(selectedMeds);
    // const combinedDateTime = new Date(date);
    // combinedDateTime.setHours(
    //   time.getHours(),
    //   time.getMinutes(),
    //   time.getSeconds()
    // );

    for (const med of selectedMeds) {
      try {
        const log = await createMedicineLog({
          variables: {
            userId: userId,
            medicineId: med.id,
            amount: Number(med.dosage),
            logTimestamp: new Date(),
          },
        });
        console.log("Mutation result:", log);
        navigation.navigate("Tabs", {
          screen: "Home",
          params: { mutatedLog: "medicine" },
        });
      } catch (error) {
        console.error("Error creating medicine log:", error);
      }
    }
  };

  return (
    <SafeAreaView>
      <View height="$full">
        <HeaderWithBackButton
          navigation={navigation}
          text="Medicine"
          rightIconOnPress={() => {}}
        />
        <ScrollView p="$4" pt="$8" pb="$16">
          <LogsTable medicinesData={medicinesData} tableType="medicines" />
          <View h={120} />
        </ScrollView>

        <ButtonFixedBottom
          onPress={handleSave}
          isDisabled={selectedMeds.length < 1}
          text="Save"
        />
      </View>
    </SafeAreaView>
  );
};

export default MedicineLogScreen;
